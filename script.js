const ids = [
  "documentType",
  "department",
  "serialNo",
  "topicName",
  "courseCode",
  "courseTitle",
  "studentName",
  "studentId",
  "semester",
  "section",
  "teacherName",
  "teacherDesignation",
  "submissionDate",
  "remarks"
];

const defaults = {
  documentType: "Lab Report",
  department: "EEE",
  serialNo: "01",
  topicName: "Ohm's Law verification",
  courseCode: "EEE 2217",
  courseTitle: "Digital Electronics",
  studentName: "Md. Ahad Hossen",
  studentId: "44250102578",
  semester: "5th",
  section: "B",
  teacherName: "Bithi Mitra",
  teacherDesignation: "Senior Lecturer",
  submissionDate: "2026-06-20",
  remarks: ""
};

function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function setOutput(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function formatDate(value) {
  if (!value) return "";
  const parts = value.split("-");
  if (parts.length !== 3) return value;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const year = parts[0];
  const monthIndex = Number(parts[1]) - 1;
  const day = Number(parts[2]);

  if (!months[monthIndex] || !day) return value;
  return `${day} ${months[monthIndex]} ${year}`;
}

function labelsFor(type) {
  const lower = type.toLowerCase();

  if (lower.includes("assignment")) {
    return ["Assignment No:", "Assignment Name:"];
  }

  if (lower.includes("project")) {
    return ["Project No:", "Project Title:"];
  }

  if (lower.includes("term")) {
    return ["Term Paper No:", "Term Paper Title:"];
  }

  if (lower.includes("presentation")) {
    return ["Presentation No:", "Presentation Topic:"];
  }

  if (lower === "report") {
    return ["Report No:", "Report Title:"];
  }

  return ["Experiment No:", "Experiment Name:"];
}

function updatePreview() {
  const type = getValue("documentType") || "Lab Report";
  const [noLabel, nameLabel] = labelsFor(type);

  setOutput("outDocumentType", type);
  setOutput("outDepartment", getValue("department"));
  setOutput("outNoLabel", noLabel);
  setOutput("outNameLabel", nameLabel);
  setOutput("outSerialNo", getValue("serialNo"));
  setOutput("outTopicName", getValue("topicName"));
  setOutput("outCourseCode", getValue("courseCode"));
  setOutput("outCourseTitle", getValue("courseTitle"));
  setOutput("outStudentName", getValue("studentName"));
  setOutput("outStudentId", getValue("studentId"));
  setOutput("outSemester", getValue("semester"));
  setOutput("outSection", getValue("section"));
  setOutput("outTeacherName", getValue("teacherName"));
  setOutput("outTeacherDesignation", getValue("teacherDesignation"));
  setOutput("outSubmissionDate", formatDate(getValue("submissionDate")));
  setOutput("outRemarks", getValue("remarks"));

  const serialLabel = document.getElementById("serialLabel");
  const topicLabel = document.getElementById("topicLabel");
  if (serialLabel) serialLabel.textContent = noLabel.replace(":", "");
  if (topicLabel) topicLabel.textContent = nameLabel.replace(":", "");
}

ids.forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", updatePreview);
  el.addEventListener("change", updatePreview);
});

const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    Object.keys(defaults).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = defaults[id];
    });
    updatePreview();
  });
}

const logoImage = document.getElementById("logoImage");
const logoFallback = document.getElementById("logoFallback");
// const logoUpload = document.getElementById("logoUpload");

if (logoImage && logoFallback) {
  logoImage.addEventListener("error", () => {
    logoImage.style.display = "none";
    logoFallback.style.display = "grid";
  });
}

if (logoUpload && logoImage && logoFallback) {
  logoUpload.addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      logoImage.src = e.target.result;
      logoImage.style.display = "block";
      logoFallback.style.display = "none";
    };
    reader.readAsDataURL(file);
  });
}

updatePreview();
