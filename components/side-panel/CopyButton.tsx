import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { toast } from "react-hot-toast";

interface Props {
  text: string;
}

const CopyButton = ({ text }: Props) => {
  const onClick = () => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
  };

  return (
    <button
      className="flex cursor-pointer bg-neutral-700/40 hover:bg-neutral-600/70 justify-center p-1 rounded-sm"
      title="Copy to clipboard"
      type="button"
      onClick={onClick}
    >
      <HiOutlineClipboardDocument />
    </button>
  );
};

export default CopyButton;
