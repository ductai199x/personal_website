import { faFacebook, faLinkedin, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

export const social = {
    facebook: {
        href: "https://facebook.com/ductai199x",
        icon: faFacebook,
    },
    linkedin: {
        href: "https://linkedin.com/in/tai-duc-nguyen",
        icon: faLinkedin,
    },
    github: {
        href: "https://github.com/ductai199x",
        icon: faGithub,
    },
    gmail: {
        href: "mailto:taiducnguyen.drexel@gmail.com",
        icon: faGoogle,
    },
};

const curYear = new Date().getFullYear();
export const descriptionList = [curYear - 1998 + " years old", "PhD student", "Drexel University"];

export const shortPara =
    "Compassion, humble, responsible, persistent, reasoning and knowledgeable are the words \
people use to describe me because I have always “stayed hungry and stayed foolish”";

const python = "Python";
const c = "C";
const cpp = "C++";
const tf = "Tensorflow";
const pyt = "Pytorch";
const react = "ReactJS";
const node = "NodeJS";
const csshtml = "CSS, HTML";
const mysql = "MySql";
const java = "Java";
const js = "Javascript";
const ts = "Typescript";
const ml = "Machine Learning";
const lnx = "Linux";
const ans = "Ansible";
const bash = "Bash";

export const expList = [
    {
        role: "Researcher",
        where: "MISL Lab @ Drexel University",
        date: "03/20 - Present",
        tech: [python, cpp, tf, pyt],
        desc: "Researched on the effectiveness of Camera Source Authentication \
neural network models, especially MISLnet. Exploring and building \
an audio/video deep-fake detector using emotion, semantic \
information, and graph similarity theory.",
    },
    {
        role: "Researcher",
        where: "DISCO Lab @ Drexel University",
        date: "09/19 - 09/20",
        tech: [c, cpp, "CARLSim"],
        desc: "Explored the inner workings of Spiking Neural Networks (SNN). \
Architected and demoed a gender classification machine (with SNN) \
using audio data. The machine’s accuracy is higher than ConvNet, \
while consuming 35 times less energy. Future developments are to \
achieve the accuracy & efficiency of the human brain.",
    },
    {
        role: "DevOps Engineer",
        where: "Dell Boomi",
        date: "04/19 - 10/19",
        tech: [lnx, ans, python, bash, "Splunk", "AWS RDS, EC2, Route53"],
        desc: "Automated and maintained the creation/retirement of complex \
cloud platforms with 75 of components in AWS. Built a stable, \
distributed monitoring security systems using Splunk Enterprise. \
Achieved the “Frontier Award” for creating “Smart Garage” to \
manage future autonomous taxies during company's annual Green Day.",
    },
    {
        role: "Researcher",
        where: "Vertically Integrated Program @ Drexel University",
        tech: [python, cpp],
        date: "04/18 - 07/19",
        desc: "Researched and developed intelligent communication protocols at \
the transport/networking layer that can tackle the “Spectrum \
Scarcity” problem in the field of Cognitive Radios. Introduced \
machine learning and optimization in the Intelligent Queueing \
System, Adaptive Modulation Control System, and Automative \
Repeat Request System.",
    },
    {
        role: "Co-Founder and Tech Lead",
        where: "Seeds Vietnam",
        date: "01/18 - 03/19",
        tech: [python, react, node, csshtml, "Firebase"],
        desc: "Created a serverless web-application for blogging on studying \
abroad and new technologies with subscription, authentication, \
email notification and real-time like/comment system using ReactJS, \
NodeJS and Google Firebase. Working on implementing machine \
learning for content recommendation and hackathon demos.",
    },
    {
        role: "Software Engineer",
        where: "Bristol-Myers Squibb",
        date: "04/18 - 10/18",
        tech: [java, js, csshtml, bash, "JDBC", mysql],
        desc: "Developed and deployed real-time global provisioning applications \
with AWS EC2, S3, MySql RDS, Route53, Lambda and a web-client \
that uses Java Spring MVC framework. Supervised and assisted in \
patching the company’s provisioning database with dozens of \
connected tables and tens of millions of rows.",
    },
];
