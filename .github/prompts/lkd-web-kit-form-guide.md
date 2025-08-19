# LKD Web Kit v0.5.12 - Guía de Componentes de Formularios

## Descripción General

LKD Web Kit es una librería de componentes React que proporciona un **sistema completo de formularios** pre-configurado con **React Hook Form** + **Zod v4** + **Mantine v8**. Todos los campos de formulario están listos para usar con validación automática, manejo de estados, y mensajes de error en español.

**Documentación de referencia:**

- Zod v4: https://zod.dev/llms.txt
- Mantine v8: https://mantine.dev/llms.txt

## Componentes de Formulario Disponibles

### Entrada de Texto

- **`FormTextInput`** - Campo de texto simple
- **`FormTextarea`** - Área de texto multilínea
- **`FormNumberInput`** - Campo numérico con controles

### Selección

- **`FormSelect`** - Select simple
- **`FormMultiSelect`** - Select múltiple
- **`FormSelectInfinity`** - Select con scroll infinito para APIs
- **`FormRadioGroup`** - Grupo de radio buttons

### Fecha y Hora

- **`FormDateInput`** - Selector de fecha simple
- **`FormDatePickerInput`** - Date picker con calendario
- **`FormDateTimePicker`** - Selector de fecha y hora
- **`FormMonthPickerInput`** - Selector de mes/año
- **`FormTimeInput`** - Campo de tiempo (HH:MM) con utilidades de conversión

### Otros Componentes

- **`FormCheckbox`** - Checkbox
- **`Form`** - Wrapper principal del formulario
- **`FormButtonSubmit`** - Botón de submit con estados automáticos

## Props Comunes de Campos de Formulario

Todos los componentes `Form*` comparten la interfaz `WithControllerProps`:

```typescript
interface WithControllerProps {
  name: string; // ✅ Requerido para React Hook Form
  label?: ReactNode; // Etiqueta del campo
  placeholder?: string; // Placeholder
  description?: ReactNode; // Texto de ayuda debajo del campo
  validate?: ZodType; // Schema de validación Zod individual
  disabled?: boolean; // Campo deshabilitado
  // + todas las props del componente Mantine base
}
```

**Nota importante:** Los campos en modo `readOnly` automáticamente usan `variant="filled"` para diferenciación visual.

## Ejemplos Prácticos

### Formulario Simple con Validación Individual

```tsx
import { Form, FormTextInput, FormNumberInput, FormButtonSubmit } from 'lkd-web-kit';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SimpleForm = () => {
  const methods = useForm({
    defaultValues: {
      name: '',
      age: 0,
    },
  });

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
        min={0}
        max={120}
        validate={z.number().min(18, 'Debes ser mayor de edad')}
      />

      <FormButtonSubmit>Enviar Formulario</FormButtonSubmit>
    </Form>
  );
};
```

### Formulario Avanzado con ZodResolver

```tsx
import { Form, FormTextInput, FormSelect, FormCheckbox, FormButtonSubmit } from 'lkd-web-kit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema completo del formulario con validaciones cruzadas
const userSchema = z
  .object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Mínimo 8 caracteres'),
    country: z.string().min(1, 'Selecciona un país'),
    acceptTerms: z.boolean(),
  })
  .check((data) => {
    if (!data.acceptTerms) {
      return {
        issues: [
          {
            code: 'custom',
            message: 'Debes aceptar los términos y condiciones',
            path: ['acceptTerms'],
          },
        ],
      };
    }
  });

const AdvancedForm = () => {
  const methods = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: '',
      country: '',
      acceptTerms: false,
    },
  });

  const handleSubmit = async (data) => {
    try {
      await registerUser(data);
      console.log('Usuario registrado:', data);
    } catch (error) {
      methods.setError('root', {
        message: 'Error del servidor al registrar usuario',
      });
    }
  };

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit}
    >
      <FormTextInput
        name="email"
        label="Correo Electrónico"
        type="email"
        placeholder="tu@email.com"
      />

      <FormTextInput
        name="password"
        label="Contraseña"
        type="password"
        description="Mínimo 8 caracteres"
      />

      <FormSelect
        name="country"
        label="País de Residencia"
        placeholder="Selecciona tu país"
        data={[
          { value: 'ar', label: 'Argentina' },
          { value: 'mx', label: 'México' },
          { value: 'co', label: 'Colombia' },
          { value: 'es', label: 'España' },
        ]}
      />

      <FormCheckbox
        name="acceptTerms"
        label="Acepto los términos y condiciones de uso"
      />

      <FormButtonSubmit disabledWhenSuccess={true}>Crear Cuenta</FormButtonSubmit>
    </Form>
  );
};
```

### FormSelectInfinity con React Query

```tsx
import { FormSelectInfinity } from 'lkd-web-kit';
import { useInfiniteQuery } from '@tanstack/react-query';

const UserSelector = () => {
  const methods = useForm();

  // Hook para cargar usuarios con paginación
  const usersQuery = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) =>
      fetch(`/api/users?page=${pageParam}&limit=20`).then((res) => res.json()),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  return (
    <Form methods={methods}>
      <FormSelectInfinity
        name="assignedUserId"
        label="Asignar Usuario"
        placeholder="Busca y selecciona un usuario..."
        infinity={usersQuery}
        getOptionLabel={(user) => `${user.name} (${user.email})`}
        getOptionValue={(user) => user.id.toString()}
        renderOption={({ option }) => (
          <div>
            <div style={{ fontWeight: 500 }}>{option.name}</div>
            <div style={{ fontSize: 12, color: 'dimmed' }}>
              {option.email} • {option.department}
            </div>
          </div>
        )}
        validate={z.string().min(1, 'Debes seleccionar un usuario')}
        searchable
        clearable
      />
    </Form>
  );
};
```

### FormTimeInput con Utilidades de Conversión

```tsx
import { FormTimeInput, timeInputToNumber, numberToTimeInput } from 'lkd-web-kit';
import { useForm } from 'react-hook-form';

const TimeBasedForm = () => {
  const methods = useForm({
    defaultValues: {
      startTime: '09:00',
      endTime: '17:30',
      duration: 2.5, // 2 horas y 30 minutos como número
    },
  });

  // Convertir duración numérica a formato tiempo
  const durationAsTime = numberToTimeInput(methods.watch('duration')); // "02:30"

  const calculateDuration = () => {
    const start = methods.watch('startTime');
    const end = methods.watch('endTime');

    if (start && end) {
      const startNum = timeInputToNumber(start); // "09:00" → 9.0
      const endNum = timeInputToNumber(end); // "17:30" → 17.5
      const duration = endNum - startNum; // 8.5 horas

      methods.setValue('duration', duration);
    }
  };

  return (
    <Form
      methods={methods}
      onSubmit={(data) => console.log('Tiempos:', data)}
    >
      <FormTimeInput
        name="startTime"
        label="Hora de Inicio"
        onChange={calculateDuration}
        validate={z.string().min(1, 'Hora requerida')}
      />

      <FormTimeInput
        name="endTime"
        label="Hora de Fin"
        onChange={calculateDuration}
        validate={z.string().min(1, 'Hora requerida')}
      />

      <div>
        <strong>Duración calculada:</strong> {durationAsTime}
        <br />
        <small>({methods.watch('duration')} horas)</small>
      </div>

      <FormButtonSubmit>Guardar Horario</FormButtonSubmit>
    </Form>
  );
};
```

## Validación Avanzada con Zod v4

### Utilidades de Validación Personalizadas

```typescript
import { nullableButRequired, optionalButRequired } from 'lkd-web-kit';
import { z } from 'zod';

const advancedSchema = z.object({
  // Campo que puede ser null pero debe estar presente cuando se envía
  category: nullableButRequired(z.string().min(1), 'La categoría es obligatoria'),

  // Campo opcional pero requerido si se proporciona
  notes: optionalButRequired(
    z.string().min(10, 'Las notas deben tener al menos 10 caracteres'),
    'Este campo es requerido si decides incluir notas',
  ),

  // Campo regular
  title: z.string().min(1, 'El título es requerido'),
});
```

### Esquemas Condicionales con .check()

```typescript
// ✅ Usar .check() para Zod v4 (NO .refine())
const conditionalSchema = z
  .object({
    hasAddress: z.boolean(),
    address: z.string().optional(),
    hasPhone: z.boolean(),
    phone: z.string().optional(),
  })
  .check((data) => {
    const issues = [];

    // Validación condicional para dirección
    if (data.hasAddress && !data.address?.trim()) {
      issues.push({
        code: 'custom',
        message: 'La dirección es requerida cuando se marca esta opción',
        path: ['address'],
      });
    }

    // Validación condicional para teléfono
    if (data.hasPhone && !data.phone?.trim()) {
      issues.push({
        code: 'custom',
        message: 'El teléfono es requerido cuando se marca esta opción',
        path: ['phone'],
      });
    }

    if (issues.length > 0) {
      return { issues };
    }
  });

// Ejemplo de validación cruzada de campos
const passwordSchema = z
  .object({
    password: z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string(),
  })
  .check((data) => {
    if (data.password !== data.confirmPassword) {
      return {
        issues: [
          {
            code: 'custom',
            message: 'Las contraseñas no coinciden',
            path: ['confirmPassword'],
          },
        ],
      };
    }
  });
```

## Estados del Formulario y Manejo de Errores

### FormButtonSubmit Inteligente

```tsx
import { FormButtonSubmit } from 'lkd-web-kit';

// El botón automáticamente maneja los estados del formulario
<FormButtonSubmit
  disabledWhenSuccess={true} // Se deshabilita después del envío exitoso
  // loading={isSubmitting}   // ✅ Se maneja automáticamente
  // disabled={...}          // ✅ Se maneja automáticamente
>
  Guardar Cambios
</FormButtonSubmit>;
```

### Manejo Completo de Errores

```tsx
const FormWithErrorHandling = () => {
  const methods = useForm();

  const handleSubmit = async (data) => {
    try {
      await saveData(data);
      // Éxito - el botón se deshabilitará automáticamente si disabledWhenSuccess=true
    } catch (error) {
      if (error.status === 422) {
        // Errores de validación del servidor
        error.fields.forEach((field) => {
          methods.setError(field.name, {
            message: field.message,
          });
        });
      } else {
        // Error general del servidor
        methods.setError('root', {
          message: 'Error del servidor. Inténtalo de nuevo.',
        });
      }
    }
  };

  const handleSubmitError = (errors) => {
    console.log('Errores de validación del cliente:', errors);
    // Los errores ya se muestran automáticamente en cada campo
  };

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit}
      onSubmitError={handleSubmitError}
    >
      {/* Mostrar error general si existe */}
      {methods.formState.errors.root && (
        <div style={{ color: 'red', marginBottom: 16 }}>
          {methods.formState.errors.root.message}
        </div>
      )}

      {/* Campos del formulario */}
      <FormTextInput
        name="name"
        label="Nombre"
      />

      <FormButtonSubmit disabledWhenSuccess>Enviar</FormButtonSubmit>
    </Form>
  );
};
```

## Características Clave del Sistema de Formularios

1. **✅ Validación Automática**: Los errores de Zod se muestran automáticamente debajo de cada campo
2. **✅ Estados Visuales**: Los campos `readOnly` usan `variant="filled"` automáticamente
3. **✅ TypeScript Completo**: Todos los componentes tienen tipado estricto con autocompletado
4. **✅ Integración Mantine**: Mantiene todas las props y funcionalidades de Mantine v8
5. **✅ Configuración Cero**: Solo instala y usa, sin configuración adicional requerida
6. **✅ Mensajes en Español**: Los errores de validación están pre-configurados en español
7. **✅ Extensible**: Puedes usar cualquier prop nativa del componente Mantine base

## Notas Importantes

### Requisitos Obligatorios

- **Todos los campos requieren la prop `name`** para funcionar con React Hook Form
- **El componente `Form` debe recibir `methods`** de `useForm()`

### Diferencias en Validación

- **Validación Individual**: Usar prop `validate` con schema Zod en cada campo
- **Validación Completa**: Usar `zodResolver` con `useForm()` para validación de todo el formulario
- **Validación Mixta**: Puedes combinar ambos enfoques según necesidades

### Compatibilidad con Zod v4

- **✅ Usar `.check()`** para validaciones condicionales
- **❌ NO usar `.refine()`** (sintaxis de Zod v3)
- **✅ Retornar `{ issues: [...] }`** en validaciones personalizadas

### Integración con Mantine

- Los componentes **extienden completamente** los componentes de Mantine
- Puedes usar **cualquier prop de Mantine** junto con las props de formulario
- El sistema está **optimizado para TypeScript** con autocompletado completo
