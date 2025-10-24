// Định nghĩa kiểu dữ liệu cho Book
interface Book {
  bookId: string;
  title: string;
  publicationYear: number;
  description: string;
  coverImageUrl: string;
  language: string;
  price: number;
  isbn?: string;
  publisherId?: string;
  pageCount?: number;
}

interface GetBook {
  bookId: string;
  title: string;
  publicationYear: number;
  description: string;
  coverImageUrl: string;
  language: string;
  price: number;
}

interface BookAuthor1 {
  book: Book;
  author: Author;
}

interface BookDetails {
  bookId: string;
  title: string;
  isbn: string;
  publicationYear: number;
  description: string;
  coverImageUrl: string;
  pageCount: number | null;
  language: string;
  price: number;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
  audiobook: Audiobook | null;
  publisher: Publisher | null;
}

interface UpdateBook {
  title: string;
  isbn: string;
  publisherId: string;
  publicationYear: number;
  description: string;
  coverImageUrl: string;
  pageCount: number;
  language: string;
  price: number;
  isActive: boolean;
}

interface Book1 {
  title: string;
  publicationYear: number;
  description: string;
  coverImageUrl: string;
  language: string;
  price: number;
  isbn?: string;
  publisherId?: string;
  pageCount?: number;
}

// Định nghĩa kiểu dữ liệu cho BookAuthor
interface BookAuthor {
  bookId: string;
  authorId: string;
}

// Định nghĩa kiểu dữ liệu cho BookCategory
interface BookCategory {
  bookId: string;
  categoryId: string;
}

interface Author {
  authorId?: string;
  authorName: string;
  biography: string;
  birthDate: string | null;
  deathDate: string | null;
  nationality: string;
  imageUrl: string;
}

interface Publisher {
  publisherId?: string;
  publisherName: string;
  description: string;
  website: string;
  foundedYear: number;
}

interface Audiobook {
  audiobookId: string;
  bookId: string;
  duration: number;
  fileSize: number;
  audioQuality: string;
  releaseDate: string;
  isComplete: boolean;
  totalChapters: number;
}

// Định nghĩa kiểu dữ liệu cho Category
interface Category {
  categoryId?: string;
  categoryName: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  displayOrder: number;
  parentCategoryId: string | null;
}

// Định nghĩa kiểu dữ liệu cho Audiobook
interface Audiobook {
  audiobookId?: string;
  bookId: string;
  duration: number;
  fileSize: number;
  audioQuality: string;
  releaseDate: string;
  isComplete: boolean;
  totalChapters: number;
}

interface AudiobookChapter {
  audiobookChapterId?: string;
  audiobookId: string;
  chapterNumber: number;
  chapterTitle: string;
  duration: number;
  fileUrl: string;
  fileSize: number;
}

interface UpdateAudiobookData {
  bookId: string;
  duration: number;
  fileSize: number;
  audioQuality: string;
  releaseDate: string;
  isComplete: boolean;
  totalChapters: number;
}

interface UpdateAudiobookChapterData {
  audiobookId: string;
  chapterNumber: number;
  chapterTitle: string;
  duration: number;
  fileUrl: string;
  fileSize: number;
}


interface EditAudioBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  initialData: {
    bookId: string;
    title: string;
    publicationYear: number;
    description: string;
    coverImageUrl: string;
    language: string;
    price: number;
    isbn: string;
    publisherId: string;
    isActive: boolean;
  };
}

interface LoginDto {
  email: string;
  password: string;
}

interface AuthDto {
  id: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

interface PaginatedBooksResponse {
  items: Book[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
