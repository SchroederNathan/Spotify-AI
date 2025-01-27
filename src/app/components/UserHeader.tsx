import { useEffect, useState } from "react";

const user = {
  name: "Rebecca Nicholas",
  role: "Product Designer",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const stats = [
  { label: "Vacation days left", value: 12 },
  { label: "Sick days left", value: 4 },
  { label: "Personal days left", value: 2 },
];

export default function UserHeader({ user }: { user: User | undefined }) {
    const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="analytics-title" className="sr-only">
        Analytics Dashboard
      </h2>
      <div className="p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="shrink-0">
              <img
                alt="User Profile Picture"
                src={user.images[0].url}
                className="mx-auto size-20 rounded-full"
              />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-400">Welcome back,</p>
              <p className="text-xl font-bold sm:text-2xl">
                {user.display_name}
              </p>
              <p className="text-sm font-medium text-gray-400">
                {user.followers.total} followers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
