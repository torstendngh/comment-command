document.addEventListener("DOMContentLoaded", () => {
  const commentInput = document.getElementById("comment");
  const lengthInput = document.getElementById("length");
  const horizontalPaddingInput = document.getElementById("horizontalPadding");
  const verticalPaddingInput = document.getElementById("verticalPadding");
  const lengthSlider = document.getElementById("lengthSlider");
  const horizontalPaddingSlider = document.getElementById(
    "horizontalPaddingSlider"
  );
  const verticalPaddingSlider = document.getElementById(
    "verticalPaddingSlider"
  );
  const presetContainer = document.getElementById("presetContainer");
  const commentStyleSelect = document.getElementById("commentStyle");
  const outputPre = document.getElementById("output");
  const copyBtn = document.getElementById("copyBtn");

  let selectedPresetIndex = 0;

  loadSettings();

  populatePresets();

  commentInput.addEventListener("input", () => {
    updateOutput();
    saveSettings();
  });

  lengthInput.addEventListener("input", () => {
    lengthSlider.value = lengthInput.value;
    updateOutput();
    saveSettings();
  });

  lengthSlider.addEventListener("input", () => {
    lengthInput.value = lengthSlider.value;
    updateOutput();
    saveSettings();
  });

  horizontalPaddingInput.addEventListener("input", () => {
    horizontalPaddingSlider.value = horizontalPaddingInput.value;
    updateOutput();
    saveSettings();
  });

  horizontalPaddingSlider.addEventListener("input", () => {
    horizontalPaddingInput.value = horizontalPaddingSlider.value;
    updateOutput();
    saveSettings();
  });

  verticalPaddingInput.addEventListener("input", () => {
    verticalPaddingSlider.value = verticalPaddingInput.value;
    updateOutput();
    saveSettings();
  });

  verticalPaddingSlider.addEventListener("input", () => {
    verticalPaddingInput.value = verticalPaddingSlider.value;
    updateOutput();
    saveSettings();
  });

  commentStyleSelect.addEventListener("input", () => {
    updateOutput();
    saveSettings();
  });

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(outputPre.textContent).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy to Clipboard";
      }, 2000);
    });
  });

  updateOutput();

  function populatePresets() {
    presetContainer.innerHTML = "";
    presets.forEach((preset, index) => {
      const presetOption = document.createElement("div");
      presetOption.classList.add("preset-option");
      if (index === selectedPresetIndex) {
        presetOption.classList.add("selected");
      }
      presetOption.addEventListener("click", () => {
        selectedPresetIndex = index;
        updateSelectedPreset();
        updateOutput();
        saveSettings();
      });
      const presetName = document.createElement("div");
      presetName.textContent = preset.name;

      const presetPreview = document.createElement("pre");
      presetPreview.textContent = preset.preview ? preset.preview.trim() : "";

      presetOption.appendChild(presetName);
      presetOption.appendChild(presetPreview);

      presetContainer.appendChild(presetOption);
    });
  }

  function updateSelectedPreset() {
    const presetOptions = document.querySelectorAll(".preset-option");
    presetOptions.forEach((option, index) => {
      if (index === selectedPresetIndex) {
        option.classList.add("selected");
      } else {
        option.classList.remove("selected");
      }
    });
  }

  function updateOutput() {
    const text = commentInput.value.trim();
    const maxWidth = parseInt(lengthInput.value, 10);
    const horizontalPadding = parseInt(horizontalPaddingInput.value, 10);
    const verticalPadding = parseInt(verticalPaddingInput.value, 10);
    const preset = presets[selectedPresetIndex];
    const commentStyle = commentStyleSelect.value;

    let box = generateBox(
      text,
      maxWidth,
      preset,
      commentStyle,
      horizontalPadding,
      verticalPadding
    );
    outputPre.textContent = box;
  }

  function generateBox(
    text,
    maxWidth,
    preset,
    commentStyle,
    horizontalPadding,
    verticalPadding
  ) {
    horizontalPadding = Math.max(0, horizontalPadding);
    verticalPadding = Math.max(0, verticalPadding);

    const contentWidth = maxWidth - 2 - horizontalPadding * 2;
    if (contentWidth < 1) {
      return "Box width is too small for the given padding.";
    }

    let words = text.split(" ");
    let lines = [];
    let currentLine = "";

    words.forEach((word) => {
      while (word.length > contentWidth) {
        const part = word.slice(0, contentWidth - 1) + "-";
        word = word.slice(contentWidth - 1);
        if (currentLine) {
          lines.push(currentLine);
          currentLine = "";
        }
        lines.push(part);
      }

      const testLine = (currentLine + " " + word).trim();
      if (testLine.length <= contentWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    });
    if (currentLine) {
      lines.push(currentLine);
    }

    for (let i = 0; i < verticalPadding; i++) {
      lines.unshift("");
      lines.push("");
    }

    const topBorder = createBorderLine(preset, maxWidth, "top");
    const bottomBorder = createBorderLine(preset, maxWidth, "bottom");
    let boxLines = [topBorder];

    lines.forEach((line) => {
      boxLines.push(createTextLine(line, preset, maxWidth, horizontalPadding));
    });

    boxLines.push(bottomBorder);

    if (commentStyle) {
      boxLines = boxLines.map((line) => `${commentStyle} ${line}`);
    }

    return boxLines.join("\n");
  }

  function createBorderLine(preset, width, position) {
    let cornerLeft, cornerRight;
    let horizontalChar;

    if (preset.corner.length === 1) {
      cornerLeft = preset.corner;
      cornerRight = preset.corner;
    } else if (preset.corner.length === 4) {
      if (position === "top") {
        cornerLeft = preset.corner[0];
        cornerRight = preset.corner[2];
      } else {
        cornerLeft = preset.corner[1];
        cornerRight = preset.corner[3];
      }
    }

    if (position === "top") {
      horizontalChar = preset.topHorizontal || preset.horizontal || "-";
    } else {
      horizontalChar = preset.bottomHorizontal || preset.horizontal || "-";
    }

    const line = cornerLeft + horizontalChar.repeat(width - 2) + cornerRight;
    return line;
  }

  function createTextLine(text, preset, width, horizontalPadding) {
    const contentWidth = width - 2 - horizontalPadding * 2;
    const paddedText =
      " ".repeat(horizontalPadding) +
      text.padEnd(contentWidth) +
      " ".repeat(horizontalPadding);
    const leftVertical = preset.leftVertical || preset.vertical || "|";
    const rightVertical = preset.rightVertical || preset.vertical || "|";
    const line = leftVertical + paddedText + rightVertical;
    return line;
  }

  function saveSettings() {
    const settings = {
      comment: commentInput.value,
      length: lengthInput.value,
      horizontalPadding: horizontalPaddingInput.value,
      verticalPadding: verticalPaddingInput.value,
      presetIndex: selectedPresetIndex,
      commentStyle: commentStyleSelect.value,
    };
    localStorage.setItem("textboxGeneratorSettings", JSON.stringify(settings));
  }

  function loadSettings() {
    const settings = JSON.parse(
      localStorage.getItem("textboxGeneratorSettings")
    );
    if (settings) {
      commentInput.value = settings.comment || "";
      lengthInput.value = settings.length || 40;
      horizontalPaddingInput.value = settings.horizontalPadding || 1;
      verticalPaddingInput.value = settings.verticalPadding || 0;
      selectedPresetIndex = settings.presetIndex || 0;
      commentStyleSelect.value = settings.commentStyle || "";
      syncSliders();
    }
  }

  function syncSliders() {
    lengthSlider.value = lengthInput.value;
    horizontalPaddingSlider.value = horizontalPaddingInput.value;
    verticalPaddingSlider.value = verticalPaddingInput.value;
  }
});
