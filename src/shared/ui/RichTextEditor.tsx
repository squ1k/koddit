import { useEffect, useRef, type ChangeEvent } from "react";
import "@/shared/ui/RichTextEditor.css";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const FONT_FAMILIES = [
    "Arial",
    "Georgia",
    "Tahoma",
    "Times New Roman",
    "Courier New",
];

const FONT_SIZES = [
    { label: "Маленький", value: "2" },
    { label: "Средний", value: "4" },
    { label: "Большой", value: "6" },
    { label: "Очень большой", value: "7" },
];

export function RichTextEditor({
    value,
    onChange,
    placeholder,
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || "";
        }
    }, [value]);

    const updateValue = () => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            onChange(html === "<br>" ? "" : html);
        }
    };

    const execCommand = (command: string, value?: string) => {
        document.execCommand("styleWithCSS", false, "true");
        document.execCommand(command, false, value ?? undefined);
        requestAnimationFrame(updateValue);
        editorRef.current?.focus();
    };

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const src = reader.result;
            if (typeof src !== "string") {
                return;
            }
            const html = `
                <figure>
                    <img src="${src}" alt="Изображение" />
                    <figcaption contenteditable="true">Подпись к изображению</figcaption>
                </figure>
                <p><br></p>
            `;
            execCommand("insertHTML", html);
        };
        reader.readAsDataURL(file);
        event.target.value = "";
    };

    const wrapSelectedImage = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return;
        }
        let node = selection.focusNode as HTMLElement | null;
        while (node && node.nodeName !== "IMG") {
            node = node.parentElement;
        }
        if (node?.nodeName === "IMG") {
            const img = node as HTMLImageElement;
            const figure = document.createElement("figure");
            const caption = document.createElement("figcaption");
            caption.textContent = "Подпись к изображению";
            caption.contentEditable = "true";
            img.replaceWith(figure);
            figure.appendChild(img);
            figure.appendChild(caption);
            requestAnimationFrame(updateValue);
        }
    };

    return (
        <div className="rich-text-editor">
            <div className="rich-text-toolbar">
                <button
                    type="button"
                    onClick={() => execCommand("bold")}
                    title="Жирный"
                >
                    B
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("italic")}
                    title="Курсив"
                >
                    I
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("underline")}
                    title="Подчеркнутый"
                >
                    U
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("justifyLeft")}
                    title="Выровнять влево"
                >
                    ↢
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("justifyCenter")}
                    title="По центру"
                >
                    ↔
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("justifyRight")}
                    title="Выровнять вправо"
                >
                    ↦
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("justifyFull")}
                    title="По ширине"
                >
                    ≡
                </button>
                <select
                    className="rich-text-select"
                    onChange={(e) => execCommand("fontName", e.target.value)}
                    defaultValue="Arial"
                    aria-label="Шрифт"
                >
                    {FONT_FAMILIES.map((font) => (
                        <option key={font} value={font}>
                            {font}
                        </option>
                    ))}
                </select>
                <select
                    className="rich-text-select"
                    onChange={(e) => execCommand("fontSize", e.target.value)}
                    defaultValue="4"
                    aria-label="Размер шрифта"
                >
                    {FONT_SIZES.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <input
                    type="color"
                    className="rich-text-color"
                    onChange={(e) => execCommand("foreColor", e.target.value)}
                    title="Цвет текста"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Вставить картинку"
                >
                    📷
                </button>
                <button
                    type="button"
                    onClick={wrapSelectedImage}
                    title="Добавить подпись к выбранной картинке"
                >
                    ✍️
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                />
            </div>
            <div
                ref={editorRef}
                className="rich-text-content"
                contentEditable
                role="textbox"
                aria-multiline="true"
                data-placeholder={placeholder || "Введите текст..."}
                onInput={updateValue}
                onBlur={updateValue}
                suppressContentEditableWarning
            />
        </div>
    );
}
