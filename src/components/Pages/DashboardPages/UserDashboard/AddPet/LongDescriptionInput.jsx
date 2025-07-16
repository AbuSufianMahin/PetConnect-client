import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button"; // shadcn/ui
import {
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered,
    Quote,
} from "lucide-react";
import { Label } from "../../../../ui/label";
import { useEffect, useState } from "react";

const LongDescriptionInput = ({ register, setValue, errors, longDescription }) => {

    const [isBoldActive, setIsBoldActive] = useState(false);
    const [isItalicActive, setIsItalicActive] = useState(false);
    const [isStrikeActive, setIsStrikeActive] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Write a detailed description about your pet",
            }),
        ],
        content: longDescription || "",
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setValue("longDescription", html, { shouldValidate: false }); // update value without triggering validation here
        },
    });

    // console.log(longDescription);

    useEffect(() => {
        register("longDescription", {
            required: "Please enter long description about your pet",
        });

    }, [register]);

    useEffect(() => {
        if (editor && longDescription !== editor.getHTML()) {
            editor.commands.setContent(longDescription || "");
        }
    }, [longDescription, editor]);


    if (!editor) return null;


    return (
        <div>
            <Label className="mb-2 md:text-lg">Long Description</Label>


            <div className="border rounded-md min-h-[150px] bg-white overflow-hidden">
                <div>
                    <div className="flex gap-1">
                        <Button
                            type="button"
                            size="icon"
                            onClick={() => {
                                editor.chain().focus().toggleBold().run();
                                setIsBoldActive(!isBoldActive);
                            }}
                            className={`${isBoldActive ? "bg-primary text-white" : "bg-white text-secondary"} hover:text-white rounded-none`}
                        >
                            <Bold className="w-4 h-4" />
                        </Button>

                        <Button
                            type="button"
                            size="icon"
                            onClick={() => {
                                editor.chain().focus().toggleItalic().run();
                                setIsItalicActive(!isItalicActive);
                            }}
                            className={`${isItalicActive ? "bg-primary text-white" : "bg-white text-secondary"} hover:text-white rounded-none`}
                        >
                            <Italic className="w-4 h-4" />
                        </Button>

                        <Button
                            type="button"
                            size="icon"
                            onClick={() => {
                                editor.chain().focus().toggleStrike().run();
                                setIsStrikeActive(!isStrikeActive);
                            }}
                            className={`${isStrikeActive ? "bg-primary text-white" : "bg-white text-secondary"} hover:text-white rounded-none`}
                        >
                            <Strikethrough className="w-4 h-4" />
                        </Button>

                        <Button
                            type="button"
                            size="icon"
                            onClick={() => {
                                editor.chain().focus().toggleBulletList().run();
                            }}
                            className="bg-white text-secondary  hover:text-white rounded-none"
                        >
                            <List className="w-4 h-4" />
                        </Button>

                        <Button
                            type="button"
                            size="icon"
                            onClick={() => {
                                editor.chain().focus().toggleOrderedList().run();
                            }}
                            className="bg-white text-secondary  hover:text-white rounded-none"
                        >
                            <ListOrdered className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="px-2 py-4 text-xs md:text-base lg:text-lg">
                    <EditorContent editor={editor} />
                </div>

            </div>
            {errors.longDescription && (
                <p className="text-xs text-red-500 mt-1">{errors.longDescription.message}</p>
            )}
        </div>
    );
}

export default LongDescriptionInput;