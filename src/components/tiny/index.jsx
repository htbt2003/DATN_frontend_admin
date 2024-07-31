import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";

export default function TinyMCE({ setValue, placeholder }) {
  const [content, setContent] = useState(placeholder);

  useEffect(() => {
      setContent(placeholder);
  }, [placeholder]);

  return (
      <Editor
          apiKey="u4knnp94hyogrbwhkeb60gg4g8o1x6bcw3z67nki2g82denv"
          init={{
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          }}
          value={content}
          onEditorChange={(content) => {
              setContent(content);
              setValue(content);
          }}
      />
  );
}

