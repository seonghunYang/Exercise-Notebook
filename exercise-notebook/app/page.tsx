import SimpleForm from "@/ui/form/simple";
import ControlledForm from "@/ui/form/simple-controlled-form";
import BlurValidControlledForm from "@/ui/form/blur-valid-controlled-form";
import RefactoringInputControlledForm from "@/ui/form/refactoring-input-controlled-fom";
import UncontrolledForm from "@/ui/form/uncontrolled-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UncontrolledForm />
    </main>
  );
}
