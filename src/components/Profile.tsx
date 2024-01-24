import Link from "next/link";

interface IProfileProps {
  login: string;
  avatar_url: string;
  followers: number;
  bio: string;
}
export default function Profile({
  login,
  avatar_url,
  followers,
  bio,
}: IProfileProps) {
  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <div className="border-b px-4 pb-6">
        <div className="text-center my-4">
          <img
            className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
            src={avatar_url}
            alt=""
          />
          <div className="py-2">
            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
              {login}
            </h3>
            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              {bio}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 px-2">
          <Link href={`https://github.com/${login}`} target="_blank">
            <button className="flex rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
              Profile
            </button>
          </Link>
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
          <svg
            className="h-6 w-6 text-gray-600 dark:text-gray-400"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              className=""
              d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
            />
          </svg>
          <span>
            <strong className="text-black dark:text-white">{followers}</strong>{" "}
            follower
          </span>
        </div>
      </div>
    </div>
  );
}
