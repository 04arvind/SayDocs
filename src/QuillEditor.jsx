// import React, { useEffect, useRef } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";

// const QuillEditor = ({ value, onChange }) => {
//   const quillRef = useRef(null);
//   const quillInstance = useRef(null);

//   useEffect(() => {
//     if (!quillRef.current || quillInstance.current) return;

//     quillInstance.current = new Quill(quillRef.current, {
//       theme: "snow",
//       modules: {
//         toolbar: [
//           [{ header: [1, 2, false] }],
//           ["bold", "italic", "underline"],
//           [{ list: "ordered" }, { list: "bullet" }],
//           ["link", "image"],
//           ["clean"],
//         ],
//       },
//     });

//     quillInstance.current.on("text-change", () => {
//       onChange(quillInstance.current.root.innerHTML);
//     });
//   }, [onChange]);

//   useEffect(() => {
//     if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
//       quillInstance.current.clipboard.dangerouslyPasteHTML(value);
//     }
//   }, [value]);

//   return <div ref={quillRef} />;
// };

// export default QuillEditor;


import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (!quillRef.current || quillInstance.current) return;

    quillInstance.current = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      },
    });

    // Editor styles
    quillInstance.current.root.style.color = "white"; // White text
    quillInstance.current.root.style.backgroundColor = "#1F2937"; // Dark background
    quillInstance.current.root.style.borderRadius = "8px";
    quillInstance.current.root.style.padding = "10px";

    // Toolbar styles
    const toolbar = quillRef.current.querySelector(".ql-toolbar");
    if (toolbar) {
      toolbar.style.backgroundColor = "#ffffff"; // White toolbar
      toolbar.style.color = "#1F2937"; // Dark icons for visibility
      toolbar.style.borderRadius = "8px";

      toolbar.querySelectorAll("button").forEach((button) => {
        button.style.color = "#1F2937"; // Dark icons
      });

      toolbar.querySelectorAll(".ql-picker").forEach((picker) => {
        picker.style.color = "#1F2937"; // Dark text in dropdowns
      });
    }

    quillInstance.current.on("text-change", () => {
      onChange(quillInstance.current.root.innerHTML);
    });
  }, [onChange]);

  useEffect(() => {
    if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
      quillInstance.current.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value]);

  return <div ref={quillRef} className="w-full" />;
};

export default QuillEditor;
