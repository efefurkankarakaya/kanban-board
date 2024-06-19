import Kanban from "@/components/board/Kanban";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

const Detail = ({ params }: Props) => {
  return (
    <main>
      <p>Board ID: {params.slug}</p>
      <p>
        <Link href="/">Home</Link>

        <Kanban />
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "#262626",
              color: "#fafafa"
            }
          }}
          position="bottom-center"
        />
      </p>
    </main>
  );
};

export default Detail;
