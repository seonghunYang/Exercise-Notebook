import SimpleForm from "@/ui/form/simple";
import ControlledForm from "@/ui/form/simple-controlled-form";
import BlurValidControlledForm from "@/ui/form/blur-valid-controlled-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BlurValidControlledForm />
    </main>
  );
}
