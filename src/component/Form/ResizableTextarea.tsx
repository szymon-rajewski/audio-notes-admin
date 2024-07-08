import React, { useEffect, useRef, useState } from 'react';
import './ResizableTextarea.css';

interface ResizableTextareaProps {
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const ResizableTextarea = ({
  value,
  onChange,
  placeholder,
}: ResizableTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 4}px`;
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);

    if (onChange) {
      onChange(event.target.value);
    }

    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <textarea
      ref={textareaRef}
      className="ResizableTextarea flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder={placeholder || 'Type something...'}
      style={{ overflow: 'hidden' }}
      value={text}
      onChange={handleChange}
    />
  );
};

export default ResizableTextarea;
