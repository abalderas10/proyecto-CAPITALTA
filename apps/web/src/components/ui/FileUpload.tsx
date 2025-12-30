import { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  accept?: string;
  onChange: (file: File | null) => void;
  value?: string | File | null;
  error?: string;
  className?: string;
}

export function FileUpload({ label, accept = ".pdf,.jpg,.png", onChange, value, error, className }: FileUploadProps) {
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
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-foreground">{label}</label>
      
      {!value ? (
        <div 
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer",
            dragActive ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50",
            error && "border-destructive bg-destructive/5"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className={cn("w-8 h-8 mb-2", dragActive ? "text-primary" : "text-muted-foreground")} />
          <p className="text-sm text-muted-foreground text-center">
            <span className="font-semibold text-primary">Haz clic para subir</span> o arrastra y suelta
          </p>
          <p className="text-xs text-muted-foreground mt-1">PDF, JPG o PNG (máx. 10MB)</p>
          <input 
            ref={inputRef}
            type="file" 
            className="hidden" 
            accept={accept} 
            onChange={handleChange} 
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{getFileName()}</p>
              <p className="text-xs text-primary flex items-center gap-1">
                <CheckCircle size={12} /> Listo para enviar
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={clearFile}
            className="p-1 hover:bg-muted rounded-full text-muted-foreground hover:text-destructive transition-colors"
          >
            <span className="sr-only">Eliminar archivo</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
