const EMOJIS = [
  "😀", "😁", "😂", "🤣", "😃",
  "😅", "😉", "😊", "😍", "😘",
  "😜", "🤔", "😎", "😏", "😢",
  "😭", "😡", "👍", "🙏", "🔥",
  // ...можно добавить еще
];

export const ChatEmojiPicker = ({
  onSelect,
}: {
  onSelect: (emoji: string) => void
}) => {
  return (
    <ul className="
      absolute bottom-12 left-0 z-30
      bg-base-100 border border-base-300 rounded-lg shadow-lg
      p-2 w-60
      grid grid-cols-5 gap-2
    ">
      {EMOJIS.map(emoji => (
        <li key={emoji}>
          <button
            type="button"
            className="btn btn-ghost btn-circle text-2xl"
            onClick={() => onSelect(emoji)}
          >
            {emoji}
          </button>
        </li>
      ))}
    </ul>
  );
};
