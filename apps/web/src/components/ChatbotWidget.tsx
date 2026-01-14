'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MessageCircle, X } from 'lucide-react';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = '+5216241234567'; // Reemplaza con tu número
    const message = 'Hola, me gustaría más información sobre los productos de crédito.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Abrir chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Widget del chatbot */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Encabezado */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4">
            <h3 className="font-bold text-lg mb-1">¿Necesitas ayuda?</h3>
            <p className="text-sm text-teal-100">
              Estamos disponibles de lunes a viernes
            </p>
          </div>

          {/* Contenido */}
          <div className="p-4 space-y-4">
            {/* Mensaje */}
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Hola 👋 Somos CAPITALTA. ¿Cómo podemos ayudarte con tu crédito hoy?
              </p>
            </div>

            {/* Opciones rápidas */}
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition text-sm font-medium text-slate-700 dark:text-slate-300">
                📊 Ver productos
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition text-sm font-medium text-slate-700 dark:text-slate-300">
                ❓ Preguntas frecuentes
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition text-sm font-medium text-slate-700 dark:text-slate-300">
                📞 Contactar con un asesor
              </button>
            </div>

            {/* Botón de WhatsApp */}
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              💬 Chatear por WhatsApp
            </Button>
          </div>

          {/* Pie de página */}
          <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 text-center text-xs text-slate-600 dark:text-slate-400">
            Responderemos en menos de 2 horas
          </div>
        </div>
      )}
    </>
  );
}
