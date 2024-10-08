"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { InputController } from "@/components/custom/form.control/InputController"
import { DateController } from "@/components/custom/form.control/DateController"
import { Form } from "@/components/ui/form"
import { SearchSelectController } from "@/components/custom/form.control/SearchSelectController"
import { useClientTranslation } from "@/i18n/client"
import { useConfig } from "@/hooks/use-config"
import { switchLocaleAction } from "@/app/actions/action"


const languages = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Marathi", value: "mr" },
]

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

const defaultValues: Partial<AccountFormValues> = {
  name: "Vishal Sannake",
  dob: new Date("08-08-2000")
}

export function AccountForm() {
  const { t } = useClientTranslation('setting');
  const [config, setConfig] = useConfig();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      ...defaultValues,
      language: config.lang
    }
  })

  function onSubmit(data: AccountFormValues) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[295px] md:w-[324px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });

    switchLocaleAction(data.language);

    setConfig({
      ...config,
      lang: data.language,
      font: data.language === 'mr' || data.language === 'hi' ? 'font-noto-sans' : 'font-inter'
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputController
          name="name"
          label={t("account.form.name")}
          description={t("account.form.name_desc")}
        />

        <DateController
          control={form.control}
          name="dob"
          label={t("account.form.dob")}
          description={t("account.form.dob_desc")}
          fromYear={2000}
          toYear={2024}
        />

        <SearchSelectController
          name="language"
          label={t("account.form.lang")}
          description={t("account.form.lang_desc")}
          options={languages}
        />

        <Button type="submit">{t("account.form.btn")}</Button>
      </form>
    </Form>
  )
}