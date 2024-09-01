import { type ReactNode, useContext } from "react"
import { createContext } from "react"

export type FormFieldContextState = {
   /**
    * Generated id for the input component.
    */
   id: string
   /**
    * Generated id for the label component.
    */
   labelId?: string
   /**
    * The name of the input. Submitted with its owning form as part of a name/value pair.
    */
   name?: string
   /**
    * A set of ids separated by a space used to describe the input component given by a set of messages.
    */
   description?: string
   /**
    * Disables the field and its associated input
    */
   disabled?: boolean
   /**
    * Marks the field and its associated input as read only
    */
   readOnly?: boolean
   /**
    * The validation state of the input.
    */
   state?: "error" | "success" | "alert"
   /**
    * If true, the form field will be invalid.
    */
   isInvalid?: boolean
   /**
    * If true, the form field will be required.
    */
   isRequired?: boolean
   /**
    * Callback used to store a descriptive message.
    */
   onMessageIdAdd: (id: string) => void
   /**
    * Callback used to remove a descriptive message.
    */
   onMessageIdRemove: (id: string) => void
}

export const FormFieldContext = createContext<FormFieldContextState | null>(
   null,
)

export const ID_PREFIX = ":form-field"

export const useFormField = () => {
   const context = useContext(FormFieldContext)

   if (!context) {
      throw Error("useFormField must be used within a FormField provider")
   }

   return context
}

type State = Partial<
   Pick<
      FormFieldContextState,
      | "id"
      | "name"
      | "description"
      | "labelId"
      | "disabled"
      | "readOnly"
      | "state"
      | "isInvalid"
      | "isRequired"
   >
>

export type FormFieldControlProps = {
   children: (state: State) => ReactNode
}

export const useFormFieldControl = () => {
   const {
      id,
      name,
      description,
      disabled,
      readOnly,
      state,
      labelId,
      isInvalid,
      isRequired,
   } = useContext(FormFieldContext) || {}

   return {
      id,
      name,
      description,
      disabled,
      readOnly,
      state,
      labelId,
      isInvalid,
      isRequired,
   } as State
}

export const FormFieldControl = ({ children }: FormFieldControlProps) => {
   const props = useFormFieldControl()

   return <>{children(props)}</>
}

FormFieldControl.displayName = "FormField.Control"
