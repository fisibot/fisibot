import URLButton from '@components/url-button';

function formsUrlButton({ user_id }: { user_id: string }) {
  const { REGISTRATION_FORM_URL, FORM_ENTRY_DISCORD_ID_ITEM } = process.env;
  return URLButton({
    label: 'Formulario de registro',
    url: `${REGISTRATION_FORM_URL}?entry.${FORM_ENTRY_DISCORD_ID_ITEM}=${user_id}`,
    emoji: '<:googleforms:1040432625162129428>',
  });
}

export default formsUrlButton;
