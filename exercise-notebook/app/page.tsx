import SimpleForm from "@/ui/form/simple";
import ControlledForm from "@/ui/form/simple-controlled-form";
import BlurValidControlledForm from "@/ui/form/blur-valid-controlled-form";
import RefactoringInputControlledForm from "@/ui/form/refactoring-input-controlled-fom";
import UncontrolledForm from "@/ui/form/uncontrolled-form";
import FormHookControlledForm from "@/ui/form/form-hook-controlled-form";
import { Checkbox, CheckboxGroup } from "@/ui/form/input/checkbox";
import { NumberField } from "@/ui/form/input/numberfiled";
import SearchBar from "@/ui/search-bar/search-bar";
import SearchBarEffect from "@/ui/search-bar/search-bar-effect";
import DebouncedSearchbar from "@/ui/search-bar/debounce-search-bar";
import SWRSearchbar from "@/ui/search-bar/swr-search-bar";
import { ProForm } from "@/form/declarative-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProForm />
    </main>
  );
}
