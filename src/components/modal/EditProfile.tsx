import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "../ui/useMediaQuery";

interface EditProfileProps {
  open: boolean;
  onClose: () => void;
  initialData: {
    name: string;
    bio: string;
  };
  onSave: (data: { name: string; bio: string }) => void;
}

const EditProfile = ({
  open,
  onClose,
  initialData,
  onSave,
}: EditProfileProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [name, setName] = React.useState(initialData.name);
  const [bio, setBio] = React.useState(initialData.bio);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, bio });
    onClose();
  };

  useEffect(() => {
    setName(initialData.name);
    setBio(initialData.bio);
  }, [initialData]);

  const content = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder="Enter your name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setBio(e.target.value)
          }
          placeholder="Write a short bio about yourself"
          className="min-h-[100px]"
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );

  if (!isDesktop) {
    return (
      <Drawer open={open} onClose={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Profile</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
