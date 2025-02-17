import { apiEmotify, apiEmotifyCancel } from "@/api/til/emotify";
import { displayEmoji, TIL_EMOJIS } from "@/constants/til.constants";
import React from "react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface EmojiProps {
  id: string;
  emojiCountData: Record<TIL_EMOJIS, EmojiCountData>;
}
interface EmojiCountData {
  count: number;
  clicked: boolean;
}

const Emoji = React.memo(({ id, emojiCountData }: EmojiProps) => {
  const [clickedEmoji, setClickedEmoji] = useState<
    Record<string, EmojiCountData>
  >({
    thumbsUp: {
      clicked: false,
      count: 0,
    },

    heart: {
      clicked: false,
      count: 0,
    },
    smile: {
      clicked: false,
      count: 0,
    },
    fire: {
      clicked: false,
      count: 0,
    },
    idea: {
      clicked: false,
      count: 0,
    },
  });
  const [totalCount, setTotalCount] = useState(0);
  const [emojiEnable, setEmojiEnable] = useState(true);
  const [isEmojiMenuVisible, setEmojiMenuVisible] = useState(false);

  const emotifyMutate = useMutation({
    mutationKey: ["emoify", id],
    mutationFn: async (emoji: string) => await apiEmotify(emoji, id),

    onSuccess(response: { type: string; count: number }) {
      const { type, count } = response;

      setClickedEmoji((current) => ({
        ...current,
        [type]: {
          clicked: true,
          count,
        },
      }));

      setTotalCount((totalCount) => totalCount + 1);
      setEmojiEnable(true);
    },
  });

  const emotifyCancelMutate = useMutation({
    mutationKey: ["emotifyCancel", id],
    mutationFn: async (emoji: string) => await apiEmotifyCancel(id, emoji),

    onSuccess(response: string) {
      const emoji = response;
      setClickedEmoji((current) => ({
        ...current,
        [emoji]: {
          clicked: false,
          count: current[emoji].count - 1,
        },
      }));
      setTotalCount((totalCount) => totalCount - 1);
      setEmojiEnable(true);
    },
  });
  const handleEmotify = async (emoji: string) => {
    setEmojiEnable(false);
    await emotifyMutate.mutate(emoji);
  };

  const handleEmotifyCancel = async (emoji: string) => {
    setEmojiEnable(false);
    await emotifyCancelMutate.mutate(emoji);
  };

  useEffect(() => {
    if (emojiCountData) {
      setClickedEmoji(emojiCountData);
    }

    let totalCount = 0;
    Object.values(emojiCountData).map(({ count }) => {
      totalCount += count;
    });
    setTotalCount(totalCount);
  }, [emojiCountData]);

  return (
    <div
      className="relative flex items-center space-x-6 border-t pt-4 mb-8"
      onMouseEnter={() => setEmojiMenuVisible(true)}
      onMouseLeave={() => setEmojiMenuVisible(false)}
    >
      {/* Main Reaction Button */}
      <div className="flex items-center gap-2 space-x-1 hover:text-gray-800 cursor-pointer text-xl">
        <span>😊</span>

        <span>{totalCount}</span>
      </div>

      {/* Emoji Menu */}
      <div
        className={`flex gap-4 items-center overflow-hidden transition-all duration-300 ${
          isEmojiMenuVisible ? "max-w-[300px]" : "max-w-0"
        }`}
      >
        {Object.entries(clickedEmoji).map(
          ([emoji, { count, clicked }], key) => {
            return (
              <button
                key={key}
                className={`flex flex-row items-center justify-items-center gap-2 relative text-2xl p-2 transition-transform disabled:cursor-not-allowed disabled:opacity-50 ${
                  clicked ? "scale-125 font-bold" : "hover:scale-110"
                }`}
                onClick={() =>
                  clicked ? handleEmotifyCancel(emoji) : handleEmotify(emoji)
                }
                disabled={emojiEnable ? false : true}
              >
                <span className={`text-${clicked ? "2xl" : "xl"}`}>
                  {displayEmoji[key]}
                </span>
                <span
                  className={`text-sm font-bold ${
                    clicked
                      ? emoji === "thumbsUp"
                        ? "text-blue-500"
                        : emoji === "heart"
                        ? "text-red-500"
                        : emoji === "smile"
                        ? "text-green-500"
                        : emoji === "fire"
                        ? "text-orange-500"
                        : emoji === "idea"
                        ? "text-yellow-500"
                        : ""
                      : ""
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          }
        )}
      </div>
    </div>
  );
});

Emoji.displayName = "Emoji";

export default Emoji;
