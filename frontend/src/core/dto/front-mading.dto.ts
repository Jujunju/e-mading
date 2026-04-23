export interface FrontMadingDTO {
  judul?: string;
  kategori?: string;
  isi?: string;
  gambar?: File | null | string;
}

export interface FrontMadingResponseDTO {
  id: string,
  judul: string;
  kategori: string;
  isi: string;
  gambar: string;
}

export interface FrontDeleteMadingDTO {
  id: string,
  gambar: string,
}
