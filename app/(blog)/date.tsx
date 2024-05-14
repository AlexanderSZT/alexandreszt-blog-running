import { format } from "date-fns";

export default function DateComponent({ dateString }: { dateString: string }) {
  return (
    <time dateTime={dateString}>
      {new Date(dateString).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  );
}
