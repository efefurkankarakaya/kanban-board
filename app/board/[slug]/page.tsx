import Kanban from "@/components/board/Kanban";
import Link from "next/link";

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
      </p>
    </main>
  );
};

export default Detail;
