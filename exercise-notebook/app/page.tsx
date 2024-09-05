import SimpleForm from "@/ui/form/simple";
import ControlledForm from "@/ui/form/simple-controlled-form";
import BlurValidControlledForm from "@/ui/form/blur-valid-controlled-form";
import RefactoringInputControlledForm from "@/ui/form/refactoring-input-controlled-fom";
import UncontrolledForm from "@/ui/form/uncontrolled-form";
import FormHookControlledForm from "@/ui/form/form-hook-controlled-form";
import { Checkbox, CheckboxGroup } from "@/ui/form/input/checkbox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormHookControlledForm />
    </main>
  );
}
