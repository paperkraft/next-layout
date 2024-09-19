'use client';
import { useClientTranslation } from '@/i18n/client';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useConfig } from '@/hooks/use-config';
import { switchLocaleAction } from '@/app/actions';

function LanguageSwitcher() {
  const {t} = useClientTranslation('common');
  const [config, setConfig] = useConfig();

  const handleChange = (event: string) => {
    const newLanguage = event;
    switchLocaleAction(newLanguage);
    setConfig({
      ...config,
      lang: newLanguage as string,
      font: newLanguage === 'mr' || newLanguage === 'hi' ? 'font-noto-sans' : config.font
    })

};
  
  return (
    <>
      <Select onValueChange={(e)=> handleChange(e)} value={config.lang}>
        <SelectTrigger className="w-[180px]">
            <SelectValue  placeholder={"Select Language" }/>
        </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={"en"}>EN {t('english')}</SelectItem>
              <SelectItem value={"hi"}>HI {t('hindi')}</SelectItem>
              <SelectItem value={"mr"}>MR {t('marathi')}</SelectItem>
            </SelectGroup>
          </SelectContent>
      </Select>
    </>
  );
}

export default LanguageSwitcher;