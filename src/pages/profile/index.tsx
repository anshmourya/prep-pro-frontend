import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Facebook, Plus, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUser from "@/apis/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { calculateStreak } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfile from "@/components/modal/EditProfile";
import toast from "react-hot-toast";

const Profile = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getMe, updateMe } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["user", "me"],
    queryFn: () => getMe(),
  });

  const { mutate: updateMeHandler } = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Profile updated successfully");
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onMutate: () => {
      toast.loading("Updating profile...");
    },
    onError: (error: any) => {
      toast.dismiss();
      const message =
        error?.response?.data?.message ?? "Failed to update profile";
      toast.error(message);
    },
  });
  const user = data?.data?.user;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const userInitials = (name: string) => {
    const nameArray = name.split(" ");
    let initials = "";
    if (nameArray.length > 1) {
      initials = nameArray[0][0] + nameArray[1][0];
    } else {
      initials = nameArray[0][0] + nameArray[0][1];
    }
    return initials;
  };

  return (
    <div className="min-h-screen px-4 py-8 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="" />
                <AvatarFallback className="font-medium text-gray-600 uppercase dark:text-gray-400">
                  {userInitials(user?.name ?? "")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  @{user?.name} · Joined{" "}
                  {new Date(user?.createdAt ?? "").toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              Edit profile
            </Button>
          </div>

          {/* Bio Section */}
          <div className="mb-6">
            {user?.bio ? (
              <p
                className="text-gray-600 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: user?.bio }}
              />
            ) : (
              <Button
                variant="outline"
                className="justify-start w-full text-gray-600 dark:text-gray-400"
                onClick={() => setIsModalOpen(true)}
              >
                + Add bio
              </Button>
            )}
          </div>

          {/* Reading Streak */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold">Reading streak</h2>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold">
                  {calculateStreak(user?.totalStreak ?? []).longestStreak}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Longest streak 🏆
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {user?.totalStreak.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total reading days
                </div>
              </div>
            </div>
          </div>

          {/* Top Tags */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Your top tags</h2>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => navigate("/tags")}
              >
                <Plus className="w-4 h-4" />
                Add tag
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {user?.tags?.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="px-3 py-1 text-sm"
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Invite Friends Card */}
        <Card className="p-6">
          <h2 className="mb-2 text-lg font-semibold">Invite friends</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Invite other learners to discover how easy it is to stay updated
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 p-2 rounded-md bg-gray-50 dark:bg-gray-800">
              <input
                type="text"
                value={window.location.origin}
                readOnly
                className="flex-1 bg-transparent border-none focus:outline-none"
              />
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {isCopied ? "Copied" : "Copy link"}
              </Button>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600 dark:text-gray-400">
                Invite via
              </span>
              <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                {/* <Whatsapp className="w-5 h-5" /> */}
              </button>
              <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
      </div>
      <EditProfile
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={{
          name: user?.name ?? "",
          bio: user?.bio ?? "",
        }}
        onSave={(data) => {
          updateMeHandler(data);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Profile;
