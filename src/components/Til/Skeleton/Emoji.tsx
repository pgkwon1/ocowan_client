import { apiEmotify, apiEmotifyCancel, apiGetEmotify } from "@/api/til/emotify";
import { displayEmoji, TIL_EMOJIS } from "@/constants/til.constants";
import React, { use } from "react";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { IRootReducer } from "@/store/reducer.dto";

interface EmojiComponentProps {
  id: string;
  emojiCountData: Record<string, number>;
}
type EmojiCountData = Record<string, number> & { totalCount: number };
const Emoji = React.memo(({ id, emojiCountData }: EmojiComponentProps) => {
  const { isLogin } = useSelector((state: IRootReducer) => state.usersReducer);
  const [clickedEmoji, setClickedEmoji] = useState<string[]>([]);
  const [countData, setCountData] = useState<EmojiCountData>({
    thumbsUp: 0,
    heart: 0,
    smile: 0,
    fire: 0,
    idea: 0,
    totalCount: 0,
  } as const);
  const [emojiEnable, setEmojiEnable] = useState(isLogin ? true : false);
  const [isEmojiMenuVisible, setEmojiMenuVisible] = useState(false);

  const { data: userEmojiData, isLoading: emojiLoading } = useQuery({
    queryFn: async () => await apiGetEmotify(id),
    queryKey: ["getEmojiByUser", id],
  });

  useEffect(() => {
    if (userEmojiData) {
      setClickedEmoji((current) =>
        userEmojiData.map((emoji: { type: string }) => emoji.type)
      );
      const { thumbsUp, heart, smile, fire, idea } = emojiCountData;
      setCountData({
        thumbsUp,
        heart,
        smile,
        fire,
        idea,
        totalCount: thumbsUp + heart + smile + fire + idea,
      });
    }
  }, [emojiLoading]);

  const emotifyMutate = useMutation({
    mutationKey: ["emoify", id],
    mutationFn: async (emoji: string) => await apiEmotify(emoji, id),

    onSuccess(response) {
      const { emoji } = response;
      const newEmojiClick = [...new Set(clickedEmoji).add(emoji)];
      setClickedEmoji(newEmojiClick);

      setCountData((current) => ({
        ...current,
        [emoji]: current[emoji] + 1,
        totalCount: current.totalCount + 1,
      }));
      setEmojiEnable(true);
    },
  });

  const emotifyCancelMutate = useMutation({
    mutationKey: ["emotifyCancel", id],
    mutationFn: async (emoji: string) => await apiEmotifyCancel(id, emoji),

    onSuccess(response) {
      const emoji = response;
      setClickedEmoji((current) => current.filter((val) => val !== emoji));
      setCountData((current) => ({
        ...current,
        [emoji]: current[emoji] - 1,
        totalCount: current.totalCount - 1,
      }));

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

  return (
    <div
      className="relative flex items-center space-x-6 border-t pt-4 mb-8"
      onMouseEnter={() => setEmojiMenuVisible(true)}
      onMouseLeave={() => setEmojiMenuVisible(false)}
    >
      {/* Main Reaction Button */}
      <div className="flex items-center gap-2 space-x-1 hover:text-gray-800 cursor-pointer text-xl">
        <span>😊</span>

        <span>{countData.totalCount}</span>
      </div>

      {/* Emoji Menu */}
      <div
        className={`flex gap-4 items-center overflow-hidden transition-all duration-300 ${
          isEmojiMenuVisible ? "max-w-[300px]" : "max-w-0"
        }`}
      >
        {["thumbsUp", "heart", "smile", "fire", "idea"].map(
          (emojiType: string, key) => {
            return (
              <button
                key={key}
                className={`flex flex-row items-center justify-items-center gap-2 relative text-2xl p-2 transition-transform disabled:cursor-not-allowed disabled:opacity-50 ${
                  clickedEmoji.includes(emojiType)
                    ? "scale-125 font-bold"
                    : "hover:scale-110"
                }`}
                onClick={() =>
                  isLogin
                    ? clickedEmoji.includes(emojiType)
                      ? handleEmotifyCancel(emojiType)
                      : handleEmotify(emojiType)
                    : null
                }
                disabled={emojiEnable ? false : true}
              >
                <span
                  className={`text-${
                    clickedEmoji.includes(emojiType) ? "2xl" : "xl"
                  }`}
                >
                  {displayEmoji[key]}
                </span>
                <span
                  className={`text-sm font-bold ${
                    clickedEmoji.includes(emojiType)
                      ? emojiType === "thumbsUp"
                        ? "text-blue-500"
                        : emojiType === "heart"
                        ? "text-red-500"
                        : emojiType === "smile"
                        ? "text-green-500"
                        : emojiType === "fire"
                        ? "text-orange-500"
                        : emojiType === "idea"
                        ? "text-yellow-500"
                        : ""
                      : ""
                  }`}
                >
                  {countData[emojiType]}
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
