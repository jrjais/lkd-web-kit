# LKD Web Kit v0.5.11 - Guía de Componentes de Formularios

## Descripción General

LKD Web Kit es una librería de componentes React que proporciona un **sistema completo de formularios** pre-configurado with **React Hook Form** + **Zod v4** + **Mantine v8**. Todos los campos de formulario están listos para usar con validación automática y manejo de estados.

**Documentación de referencia:**

- Zod v4: https://zod.dev/llms.txt
- Mantine v8: https://mantine.dev/llms.txt

## Componentes Disponibles

### Campos de Formulario

Todos los componentes `Form*` están pre-configurados con React Hook Form y soportan validación Zod automática:

#### Entrada de Texto

- `FormTextInput` - Campo de texto simple
- `FormTextarea` - Área de texto multilínea
- `FormNumberInput` - Campo numérico con controles

#### Selección

- `FormSelect` - Select simple
- `FormMultiSelect` - Select múltiple
- `FormInfinitySelect` - Select con scroll infinito (para APIs)
- `FormRadioGroup` - Grupo de radio buttons

#### Fecha y Hora

- `FormDateInput` - Selector de fecha
- `FormDatePickerInput` - Date picker con calendario
- `FormDateTimePicker` - Selector de fecha y hora
- `FormMonthPickerInput` - Selector de mes/año
- `FormTimeInput` - Campo de tiempo (HH:MM)

#### Otros

- `FormCheckbox` - Checkbox
- `Form` - Wrapper principal del formulario
- `FormButtonSubmit` - Botón de submit con estados automáticos

### Props Comunes para Todos los Campos

```typescript
interface CommonFormProps {
  name: string; // Campo requerido para React Hook Form
  label?: ReactNode; // Etiqueta del campo
  placeholder?: string; // Placeholder
  description?: ReactNode; // Texto de ayuda
  validate?: ZodType; // Schema de validación Zod
  disabled?: boolean; // Deshabilitado
  readOnly?: boolean; // Solo lectura (aplica variant="filled")
  // + todas las props del componente Mantine base
}
```

## Uso Básico

### Formulario Simple

```tsx
import { Form, FormTextInput, FormNumberInput, FormButtonSubmit } from 'lkd-web-kit';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const MyForm = () => {
  const methods = useForm();

  const handleSubmit = (data) => {
    console.log('Datos del formulario:', data);
  };

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit}
    >
      <FormTextInput
        name="name"
        label="Nombre Completo"
        placeholder="Ingresa tu nombre"
        validate={z.string().min(2, 'Mínimo 2 caracteres')}
      />

      <FormNumberInput
        name="age"
        label="Edad"
        validate={z.number().min(18, 'Debes ser mayor de edad')}
      />

      <FormButtonSubmit>Enviar Formulario</FormButtonSubmit>
    </Form>
  );
};
```

### Formulario con Validación Avanzada

```tsx
import { Form, FormTextInput, FormSelect, FormCheckbox } from 'lkd-web-kit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema completo del formulario
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  country: z.string().min(1, 'Selecciona un país'),
  acceptTerms: z.boolean().refine((val) => val, 'Debes aceptar los términos'),
});

const UserForm = () => {
  const methods = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  return (
    <Form
      methods={methods}
      onSubmit={(data) => console.log(data)}
    >
      <FormTextInput
        name="email"
        label="Email"
        type="email"
      />

      <FormTextInput
        name="password"
        label="Contraseña"
        type="password"
      />

      <FormSelect
        name="country"
        label="País"
        data={[
          { value: 'ar', label: 'Argentina' },
          { value: 'mx', label: 'México' },
          { value: 'co', label: 'Colombia' },
        ]}
      />

      <FormCheckbox
        name="acceptTerms"
        label="Acepto términos y condiciones"
      />

      <FormButtonSubmit>Registrarse</FormButtonSubmit>
    </Form>
  );
};
```

### Select con Datos Infinitos (API)

```tsx
import { FormInfinitySelect } from 'lkd-web-kit';
import { useInfiniteQuery } from '@tanstack/react-query';

const UserSelector = () => {
  // Hook de React Query para cargar datos con paginación
  const usersQuery = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => fetch(`/api/users?page=${pageParam}`).then((res) => res.json()),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return (
    <FormInfinitySelect
      name="userId"
      label="Seleccionar Usuario"
      infinity={usersQuery}
      getOptionLabel={(user) => `${user.name} (${user.email})`}
      getOptionValue={(user) => user.id.toString()}
      renderOption={({ option }) => (
        <div>
          <div>{option.name}</div>
          <div style={{ fontSize: '12px', color: 'gray' }}>{option.email}</div>
        </div>
      )}
      validate={z.string().min(1, 'Selecciona un usuario')}
    />
  );
};
```

### Campo de Tiempo con Utilidades

```tsx
import { FormTimeInput, timeInputToNumber, numberToTimeInput } from 'lkd-web-kit';

const TimeForm = () => {
  const methods = useForm({
    defaultValues: {
      startTime: '09:00',
      duration: 2.5, // 2 horas y 30 minutos
    },
  });

  // Convertir número a formato tiempo para mostrar
  const durationAsTime = numberToTimeInput(methods.watch('duration')); // "02:30"

  return (
    <Form methods={methods}>
      <FormTimeInput
        name="startTime"
        label="Hora de Inicio"
        validate={z.string().min(1)}
      />

      <FormTimeInput
        name="endTime"
        label="Hora de Fin"
        defaultValue={durationAsTime}
        onChange={(e) => {
          // Convertir tiempo a número para cálculos
          const timeAsNumber = timeInputToNumber(e.target.value);
          methods.setValue('duration', timeAsNumber);
        }}
      />
    </Form>
  );
};
```

## Validación Avanzada con Zod

### Esquemas Condicionales

```typescript
const conditionalSchema = z
  .object({
    hasAddress: z.boolean(),
    address: z.string().optional(),
  })
  .check((data) => {
    if (data.hasAddress && !data.address) {
      return {
        issues: [
          {
            code: 'custom',
            message: 'La dirección es requerida',
            path: ['address'],
          },
        ],
      };
    }
  });
```

### Validación Personalizada

```typescript
// Usar las utilidades de lkd-web-kit
import { nullableButRequired, optionalButRequired } from 'lkd-web-kit';

const schema = z.object({
  // Campo que puede ser null pero debe estar presente
  category: nullableButRequired(z.string()),

  // Campo opcional pero requerido si existe
  notes: optionalButRequired(z.string().min(10)),
});

// Ejemplo usando check de Zod v4
const customValidationSchema = z
  .object({
    email: z.string().email(),
    confirmEmail: z.string().email(),
  })
  .check((data) => {
    if (data.email !== data.confirmEmail) {
      return {
        issues: [
          {
            code: 'custom',
            message: 'Los emails no coinciden',
            path: ['confirmEmail'],
          },
        ],
      };
    }
  });
```

## Estados del Formulario

### Botón de Submit Inteligente

```tsx
<FormButtonSubmit
  disabledWhenSuccess={true} // Se deshabilita al enviar exitosamente
  loading={isSubmitting} // Muestra spinner automáticamente
>
  Guardar Cambios
</FormButtonSubmit>
```

### Manejo de Errores

```tsx
const MyForm = () => {
  const methods = useForm();

  const handleSubmit = async (data) => {
    try {
      await saveData(data);
    } catch (error) {
      // Mostrar errores del servidor
      methods.setError('root', {
        message: 'Error del servidor',
      });
    }
  };

  const handleSubmitError = (errors) => {
    console.log('Errores de validación:', errors);
  };

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit}
      onSubmitError={handleSubmitError}
    >
      {/* campos */}
    </Form>
  );
};
```

## Características Clave

1. **Validación Automática**: Los errores de Zod se muestran automáticamente debajo de cada campo
2. **Estados Visuales**: Los campos `readOnly` usan `variant="filled"` automáticamente
3. **TypeScript Completo**: Todos los componentes tienen tipado estricto
4. **Integración Mantine**: Mantiene todas las props y funcionalidades de Mantine
5. **Configuración Cero**: Solo instala y usa, sin configuración adicional
6. **Mensajes en Español**: Los errores de validación están pre-configurados en español

## Notas Importantes

- Todos los campos requieren la prop `name` para funcionar con React Hook Form
- La validación con `validate` prop es individual por campo
- Para validación completa del formulario, usa `zodResolver` con `useForm`
- Los componentes extienden completamente los componentes de Mantine, puedes usar cualquier prop de Mantine
- El sistema está optimizado para TypeScript y proporciona autocompletado completo
