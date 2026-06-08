import { ProfileForm } from "@/features/auth/components/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-black">Profile</h1>
        <p className="text-sm text-zinc-600">
          Update your personal information and account settings.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}
