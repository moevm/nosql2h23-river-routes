export const exportFile = (inputValue: any) => {
  let blob = new Blob([JSON.stringify(inputValue)], { type: "json" });
  let a = document.createElement("a");
  a.download = "data";
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = ["json", a.download, a.href].join(":");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
  }, 1500);
  return false;
};

export function uploadFile(): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = () => {
      const file = input.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const contents = e.target.result as string;
          resolve(contents);
        };
        reader.onerror = (e) => {
          reject(new Error("Failed to read file"));
        };
        reader.readAsText(file);
      } else {
        reject(new Error("No file selected"));
      }
    };

    input.click();
  });
}
