const presets = [
  {
    name: "Hash Box",
    topHorizontal: "#",
    bottomHorizontal: "#",
    leftVertical: "#",
    rightVertical: "#",
    corner: "#",
    preview: `
#######
# BOX #
#######`,
  },
  {
    name: "Asterisk Box",
    topHorizontal: "*",
    bottomHorizontal: "*",
    leftVertical: "*",
    rightVertical: "*",
    corner: "*",
    preview: `
*******
* BOX *
*******`,
  },
  {
    name: "Simple Line Box",
    topHorizontal: "-",
    bottomHorizontal: "-",
    leftVertical: "|",
    rightVertical: "|",
    corner: "+",
    preview: `
+-----+
| BOX |
+-----+`,
  },
  {
    name: "Double Line Box",
    topHorizontal: "═",
    bottomHorizontal: "═",
    leftVertical: "║",
    rightVertical: "║",
    corner: "╔╚╗╝",
    preview: `
╔═════╗
║ BOX ║
╚═════╝`,
  },
  {
    name: "Unicode Box",
    topHorizontal: "─",
    bottomHorizontal: "─",
    leftVertical: "│",
    rightVertical: "│",
    corner: "┌└┐┘",
    preview: `
┌─────┐
│ BOX │
└─────┘`,
  },
  {
    name: "Thick Box",
    topHorizontal: "━",
    bottomHorizontal: "━",
    leftVertical: "┃",
    rightVertical: "┃",
    corner: "┏┗┓┛",
    preview: `
┏━━━━━┓
┃ BOX ┃
┗━━━━━┛`,
  },
  {
    name: "Dotted Box",
    topHorizontal: ".",
    bottomHorizontal: ".",
    leftVertical: ":",
    rightVertical: ":",
    corner: ".",
    preview: `
.......
: BOX :
.......`,
  },
  {
    name: "Equal and Pipe Box",
    topHorizontal: "=",
    bottomHorizontal: "=",
    leftVertical: "|",
    rightVertical: "|",
    corner: "+",
    preview: `
+=====+
| BOX |
+=====+`,
  },
  {
    name: "Curved Box",
    topHorizontal: "-",
    bottomHorizontal: "-",
    leftVertical: "|",
    rightVertical: "|",
    corner: "/\\/\\", // Top-left, bottom-left, top-right, bottom-right
    preview: `
/-----\\
| BOX |
\\-----/`,
  },
  // Add more presets as needed
];
