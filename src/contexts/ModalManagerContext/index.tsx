'use client'
import type { ModalProps } from '@mantine/core'
import type { ComponentType, ReactNode } from 'react'
import { createContext, use, useEffect, useMemo, useState } from 'react'
import type { ModalManagerWrapperProps } from 'src/hocs'

export interface ModalRegistryItem<Props extends object = object> {
  component?: ComponentType<ModalManagerWrapperProps<object>>
  load?: () => Promise<{ default: ComponentType<ModalManagerWrapperProps<object>> }>
  path?: string
  readonly __props?: Props
}

export type ModalRegistryRecord = Record<string, ModalRegistryItem>

export interface ModalManagerRegistryOverride {}

export type ModalRegistry = ModalManagerRegistryOverride extends {
  modals: infer Registry extends ModalRegistryRecord
}
  ? Registry
  : ModalRegistryRecord

export type ModalKey = Extract<keyof ModalRegistry, string>

export type ShowModalOptions = { multiple?: boolean } & Partial<ModalProps>

export interface ModalManagerProviderProps {
  children: ReactNode
  modals: ModalRegistry
  loadModals?: (ModalKey | (string & {}))[]
}

type PublicModalProps<Key extends ModalKey> =
  ModalRegistry[Key] extends ModalRegistryItem<infer Props> ? Props : never

type StatusModal = {
  modalKey: ModalKey
  props?: object
  modalProps?: Partial<ModalProps>
  opened?: boolean
}

type ModalManagerValues = {
  showModal: <Key extends ModalKey>(
    key: Key,
    props?: PublicModalProps<Key>,
    options?: ShowModalOptions,
  ) => void
  closeModal: (key?: ModalKey) => void
}

const ModalManagerContext = createContext<ModalManagerValues | undefined>(undefined)

export const ModalManagerProvider = ({
  children,
  modals,
  loadModals = [],
}: ModalManagerProviderProps) => {
  const [statusModal, setStatusModal] = useState<StatusModal[]>([])

  useEffect(() => {
    loadModals.forEach((modalKey) => {
      const modalKeys = Object.keys(modals).filter((key) => key.startsWith(modalKey))

      modalKeys.forEach((key) => {
        const item = modals[key as ModalKey]

        item.load?.().then((modal) => {
          item.component = modal.default
        })
      })
    })
  }, [loadModals, modals])

  const showModal: ModalManagerValues['showModal'] = (key, props, options) => {
    const { multiple, ...modalProps } = options ?? {}
    const modalState = {
      modalKey: key,
      props,
      modalProps,
      opened: true,
    }

    setStatusModal((prev) => (multiple ? [...prev, modalState] : [modalState]))
  }

  const closeModal: ModalManagerValues['closeModal'] = (key) => {
    if (key === undefined) {
      setStatusModal((prev) => prev.map((modal) => ({ ...modal, opened: false })))
      return
    }

    setStatusModal((prev) =>
      prev.map((modal) => (modal.modalKey === key ? { ...modal, opened: false } : modal)),
    )
  }

  const renderModals = useMemo(
    () =>
      statusModal.map(({ modalKey, props, opened, modalProps }, i) => {
        const Component = modals[modalKey]?.component

        if (!Component) return null

        return (
          <Component
            {...props}
            key={`${modalKey}-${i}`}
            modalProps={{ ...modalProps, opened, zIndex: 200 + i }}
            removeModal={() => {
              setStatusModal((prev) => prev.filter((_, index) => index !== i))
            }}
          />
        )
      }),
    [statusModal, modals],
  )

  return (
    <ModalManagerContext.Provider value={{ showModal, closeModal }}>
      {renderModals}
      {children}
    </ModalManagerContext.Provider>
  )
}

export const useModalManager = () => {
  const context = use(ModalManagerContext)

  if (context === undefined) throw Error('Out of context: useModalManager')

  return context
}
