import { CreatedNoteParamsType, Note } from "../types/note";
import axios from "axios";
const AuthorizationToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NoteServiceType {
  notes: Note[];
  totalPages: number;
}

const ReqUrl = "https://notehub-public.goit.study/api/notes";

export const fetchNotes = async (
  page: number,
  query: string,
  tag?: string
): Promise<NoteServiceType> => {
  const configurations = {
    params: tag
      ? {
          search: query,
          page: page,
          perPage: 12,
          tag: tag,
        }
      : {
          search: query,
          page: page,
          perPage: 12,
        },
    headers: {
      Authorization: `Bearer ${AuthorizationToken}`,
    },
  };
  const response = await axios.get<NoteServiceType>(ReqUrl, configurations);
  return response.data;
};

export const fetchNoteById = async (id: Note["id"]) => {
  const response = await axios.get<Note>(`${ReqUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${AuthorizationToken}`,
    },
  });
  return response.data;
};

export const createNote = async (
  values: CreatedNoteParamsType
): Promise<Note> => {
  const response = await axios.post<Note>(ReqUrl, values, {
    headers: {
      Authorization: `Bearer ${AuthorizationToken}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const response = await axios.delete<Note>(`${ReqUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${AuthorizationToken}`,
    },
  });

  return response.data;
};
