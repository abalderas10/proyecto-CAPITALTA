import { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept?: string;
  onChange: (file: File | null) => void;
  value?: string | File | null; // Puede ser una URL (string) si ya se subió, o un File
  error?: string;
}

export function FileUpload({ label, accept = ".pdf,.jpg,.png", onChange, value, error }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  const clearFile = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const getFileName = () => {
    if (!value) return null;
    if (value instanceof File) return value.name;
    if (typeof value === 'string') return value.split('/').pop() || 'Documento cargado';
    return 'Archivo';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {!value ? (
        <div 
          className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer
            ${dragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:bg-gray-50'}
            ${error ? 'border-red-500 bg-red-50' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className={`w-8 h-8 mb-2 ${dragActive ? 'text-teal-600' : 'text-gray-400'}`} />
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold text-teal-600">Haz clic para subir</span> o arrastra y suelta
          </p>
          <p className="text-xs text-gray-500 mt-1">PDF, JPG o PNG (máx. 10MB)</p>
          <input 
            ref={inputRef}
            type="file" 
            className="hidden" 
            accept={accept} 
            onChange={handleChange} 
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{getFileName()}</p>
              <p className="text-xs text-teal-600 flex items-center gap-1">
                <CheckCircle size={12} /> Listo para enviar
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={clearFile}
            className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}
      
      {error && (
        <p className="text-xs text-red-500 mt-1" role="alert">{error}</p>
      )}
    </div>
  );
}
