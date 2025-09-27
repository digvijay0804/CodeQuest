const mongoose = require("mongoose");
const Question = require("../models/Question");  
const dotenv = require('dotenv');

dotenv.config();

const cnQuestions = [
  {
    question: "What is the main purpose of the OSI model in computer networks?",
    options: ["Standardization", "Security", "Faster transmission", "Error removal"],
    correctAnswer: "Standardization",
    category: "CN",
  },
  {
    question: "How many layers are there in the OSI model?",
    options: ["5", "6", "7", "4"],
    correctAnswer: "7",
    category: "CN",
  },
  {
    question: "Which protocol is used to send emails?",
    options: ["HTTP", "SMTP", "FTP", "SNMP"],
    correctAnswer: "SMTP",
    category: "CN",
  },
  {
    question: "Which layer of OSI model is responsible for routing?",
    options: ["Data Link", "Network", "Transport", "Application"],
    correctAnswer: "Network",
    category: "CN",
  },
  {
    question: "What is the default port number of HTTP?",
    options: ["21", "80", "25", "110"],
    correctAnswer: "80",
    category: "CN",
  },
  {
    question: "Which of the following is a connection-oriented protocol?",
    options: ["UDP", "TCP", "IP", "ICMP"],
    correctAnswer: "TCP",
    category: "CN",
  },
  {
    question: "Which device connects two different networks?",
    options: ["Hub", "Switch", "Router", "Bridge"],
    correctAnswer: "Router",
    category: "CN",
  },
  {
    question: "Which layer ensures error-free delivery of data?",
    options: ["Data Link", "Physical", "Transport", "Network"],
    correctAnswer: "Transport",
    category: "CN",
  },
  {
    question: "What does IP stand for?",
    options: ["Internet Protocol", "Internal Protocol", "Interconnected Process", "Interface Program"],
    correctAnswer: "Internet Protocol",
    category: "CN",
  },
  {
    question: "Which layer of OSI handles encryption and compression?",
    options: ["Session", "Application", "Presentation", "Transport"],
    correctAnswer: "Presentation",
    category: "CN",
  },
  {
    question: "Which of the following is a Data Link layer device?",
    options: ["Switch", "Hub", "Router", "Gateway"],
    correctAnswer: "Switch",
    category: "CN",
  },
  {
    question: "Which protocol is used to transfer files?",
    options: ["FTP", "SMTP", "SNMP", "DNS"],
    correctAnswer: "FTP",
    category: "CN",
  },
  {
    question: "Which layer is responsible for framing?",
    options: ["Physical", "Data Link", "Network", "Transport"],
    correctAnswer: "Data Link",
    category: "CN",
  },
  {
    question: "Which protocol translates domain names to IP addresses?",
    options: ["HTTP", "DNS", "SMTP", "DHCP"],
    correctAnswer: "DNS",
    category: "CN",
  },
  {
    question: "IPv4 address size is?",
    options: ["32-bit", "64-bit", "128-bit", "16-bit"],
    correctAnswer: "32-bit",
    category: "CN",
  },
  {
    question: "Which protocol provides connectionless communication?",
    options: ["TCP", "UDP", "FTP", "HTTP"],
    correctAnswer: "UDP",
    category: "CN",
  },
  {
    question: "Which layer of TCP/IP model corresponds to OSI’s Transport layer?",
    options: ["Internet", "Application", "Network Access", "Transport"],
    correctAnswer: "Transport",
    category: "CN",
  },
  {
    question: "Which protocol is used for secure communication over the internet?",
    options: ["FTP", "HTTPS", "SMTP", "SNMP"],
    correctAnswer: "HTTPS",
    category: "CN",
  },
  {
    question: "What is the maximum length of an Ethernet cable?",
    options: ["100m", "200m", "50m", "500m"],
    correctAnswer: "100m",
    category: "CN",
  },
  {
    question: "Which layer is responsible for end-to-end communication?",
    options: ["Network", "Data Link", "Transport", "Physical"],
    correctAnswer: "Transport",
    category: "CN",
  },
  {
    question: "Which protocol is used for remote login?",
    options: ["HTTP", "FTP", "TELNET", "SMTP"],
    correctAnswer: "TELNET",
    category: "CN",
  },
  {
    question: "Which protocol is used in the ping command?",
    options: ["ICMP", "TCP", "UDP", "IP"],
    correctAnswer: "ICMP",
    category: "CN",
  },
  {
    question: "What does DHCP stand for?",
    options: ["Dynamic Host Configuration Protocol", "Data Handling Control Protocol", "Direct Host Communication Protocol", "Domain Host Control Protocol"],
    correctAnswer: "Dynamic Host Configuration Protocol",
    category: "CN",
  },
  {
    question: "Which multiple access method is used in Ethernet?",
    options: ["CDMA", "CSMA/CD", "FDMA", "TDMA"],
    correctAnswer: "CSMA/CD",
    category: "CN",
  },
  {
    question: "Which protocol is responsible for error reporting in networks?",
    options: ["ICMP", "IP", "TCP", "UDP"],
    correctAnswer: "ICMP",
    category: "CN",
  },
];

async function seedCnQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // use Atlas connection string
    await Question.deleteMany({ subject: "cn" });
    await Question.insertMany(cnQuestions.map(q => ({ ...q, subject: "cn" })));
    console.log("CN questions seeded!");
  } catch (error) {
    console.error("Error seeding CN questions:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedCnQuestions();
