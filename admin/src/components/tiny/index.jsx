import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCE(prop) {
    return (
      <Editor
        apiKey='u4knnp94hyogrbwhkeb60gg4g8o1x6bcw3z67nki2g82denv'
        init={{
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          // tinycomments_mode: 'embedded',
          // tinycomments_author: 'Author name',
          // mergetags_list: [
          //   { value: 'First.Name', title: 'First Name' },
          //   { value: 'Email', title: 'Email' },
          // ],
          // ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        }}
        initialValue={prop.placeholder}
        onEditorChange={(content, editor) => {
          prop.setValue(content);
        }}
      />
    );
}
