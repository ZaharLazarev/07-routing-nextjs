import { useId } from "react";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { createNote } from "@/lib/api";
import { CreatedNoteParamsType, Note } from "../../types/note";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface NoteFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const initialValues: CreatedNoteParamsType = {
  title: "",
  content: "",
  tag: "",
};

export default function NoteForm({ onClose, onSuccess }: NoteFormProps) {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title is too short")
      .max(50, "Title is too long")
      .required("Title is required"),
    content: Yup.string().max(500, "Content is too long"),
    tag: Yup.string()
      .oneOf(
        ["Todo", "Work", "Personal", "Meeting", "Shopping"],
        "Invalid option"
      )
      .required("Tag is required"),
  });
  const fieldId = useId();

  const queryClient = useQueryClient();

  const { mutate } = useMutation<Note, Error, CreatedNoteParamsType>({
    mutationFn: (values) => createNote(values),
  });

  const handleSubmit = (
    values: CreatedNoteParamsType,
    actions: FormikHelpers<CreatedNoteParamsType>
  ) => {
    actions.resetForm();
    mutate(
      {
        title: values.title,
        content: values.content,
        tag: values.tag,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["notes"] });
          onSuccess();
        },
        onError: () => {
          toast("Nothing to add");
        },
      }
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            name="content"
            className={css.textarea}
            id="content"
            rows={8}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="">--Choose option--</option>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
