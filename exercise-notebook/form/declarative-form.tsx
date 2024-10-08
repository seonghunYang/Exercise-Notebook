"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

// inteface

type FormElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function ProgressiveFormRoot({ children }: React.PropsWithChildren<{}>) {
  // children의 deponds에 값들이 tocued 되었는지에 따라서 보여줅지 말지 확인
  const ref = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<Record<string, any>>({});

  // 노드가 바뀔 수 있으니 이벤트 재등록
  // 대신 formstate이 값이 바뀔 때 마다 갱신되지 않음
  useEffect(() => {
    const handleChage = (element: FormElements) => {
      setFormState((prev) => ({ ...prev, [element.name]: element.value }));
    };

    if (ref.current) {
      for (let i = 0; i < ref.current.elements.length; i++) {
        const element = ref.current.elements[i] as FormElements;

        element.addEventListener("change", (event) => {
          handleChage(event.target as FormElements);
        });
      }
    }

    return () => {
      if (ref.current) {
        for (let i = 0; i < ref.current.elements.length; i++) {
          const element = ref.current.elements[i] as FormElements;
          element.removeEventListener("change", (event) => {
            handleChage(event.target as FormElements);
          });
        }
      }
    };
  }, [formState]);

  return (
    <form ref={ref}>
      {React.Children.toArray(children).filter((child) => {
        if (!React.isValidElement(child)) return false;
        if (child.type !== Step) return false;

        const { depends } = child.props as Step;
        // depends 의 값이 특정 조건을 만족하는지 확인
        if (depends === undefined) return true;

        if (Array.isArray(depends)) {
          return depends.every((depend) => {
            if (formState[depend]) return true;
            return false;
          });
        }

        if (typeof depends === "string") {
          if (formState[depends]) return true;
          return false;
        }

        if (typeof depends === "object") {
          return Object.keys(depends).every((key) => {
            if (formState[key] === depends[key]) return true;
            return false;
          });
        }
        return false;
      })}
    </form>
  );
}

const ProgressiveForm = Object.assign(ProgressiveFormRoot, {
  Step: Step,
});

export function ProForm() {
  // const { ProgressiveForm } = useProForm();

  return (
    <ProgressiveForm>
      <ProgressiveForm.Step>
        <label>이름</label>
        <input name="name" />
      </ProgressiveForm.Step>
      <ProgressiveForm.Step depends={["name", "birthday"]}>
        <label>전화번호</label>
        <input name="phone" />
      </ProgressiveForm.Step>
      <ProgressiveForm.Step
        depends={{
          name: "홍길동",
        }}
      >
        <label>생일</label>
        <input name="birthday" />
      </ProgressiveForm.Step>
    </ProgressiveForm>
  );
}

interface Step {
  // name: string; // name을 안받아도 될 것 같다는 생각이 든다.
  depends?: Record<string, any> | string[] | string;
  isError?: boolean;
}

function Step({ depends, isError, children }: React.PropsWithChildren<Step>) {
  return <>{children}</>;
}
