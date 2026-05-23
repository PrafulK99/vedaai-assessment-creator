import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { AssessmentContext } from "@/store/useAssessmentStore";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#000000",
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 15,
  },
  schoolName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  subjectLine: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  classLine: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginBottom: 15,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    fontFamily: "Helvetica-Bold",
  },
  instructionLine: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 15,
  },
  studentInfoContainer: {
    marginBottom: 30,
  },
  studentInfoRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-end",
  },
  studentInfoLabel: {
    fontFamily: "Helvetica-Bold",
    marginRight: 5,
  },
  studentInfoLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 10,
  },
  questionRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  questionNumber: {
    width: 20,
    fontFamily: "Helvetica-Bold",
  },
  questionContent: {
    flex: 1,
  },
  questionTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  questionText: {
    flex: 1,
    textAlign: "justify",
    paddingRight: 15,
    lineHeight: 1.3,
  },
  marksColumn: {
    alignItems: "flex-end",
    width: 60,
  },
  marksText: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  difficultyTag: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#4B5563",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: "2 4",
    borderRadius: 4,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  optionItem: {
    width: "50%",
    marginBottom: 4,
  },
  blankLinesContainer: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
    paddingRight: 30,
  },
  blankLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#9CA3AF",
    borderBottomStyle: "dashed",
    height: 15,
    marginBottom: 15,
  },
  endMark: {
    textAlign: "center",
    marginTop: 30,
    fontFamily: "Helvetica-Bold",
  },
  answerKeySection: {
    marginTop: 40,
  },
  answerKeyTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginBottom: 15,
  },
  answerKeyRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  answerKeyNumber: {
    width: 20,
    fontFamily: "Helvetica-Bold",
  },
  answerKeyText: {
    flex: 1,
  },
});

interface AssessmentPDFProps {
  assessment: AssessmentContext;
}

const getDifficultyLabel = (difficulty: string) => {
  if (!difficulty) return "Medium";
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
};

export const AssessmentPDF: React.FC<AssessmentPDFProps> = ({ assessment }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.schoolName}>
            {assessment.schoolName || "Delhi Public School, Sector-4, Bokaro"}
          </Text>
          <Text style={styles.subjectLine}>
            Subject: {assessment.subject || "English"}
          </Text>
          <Text style={styles.classLine}>
            Class: {assessment.classLevel || "5th"}
          </Text>
        </View>

        {/* Meta Row */}
        <View style={styles.metaRow}>
          <Text>Time Allowed: {assessment.timeAllowed || "45 minutes"}</Text>
          <Text>Maximum Marks: {assessment.totalMarks || "20"}</Text>
        </View>

        <Text style={styles.instructionLine}>
          All questions are compulsory unless stated otherwise.
        </Text>

        {/* Student Info */}
        <View style={styles.studentInfoContainer}>
          <View style={styles.studentInfoRow}>
            <Text style={styles.studentInfoLabel}>Name: </Text>
            <View style={styles.studentInfoLine} />
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <View style={{ flexDirection: "row", flex: 1, alignItems: "flex-end" }}>
              <Text style={styles.studentInfoLabel}>Roll Number: </Text>
              <View style={styles.studentInfoLine} />
            </View>
            <View style={{ flexDirection: "row", flex: 1, alignItems: "flex-end", paddingLeft: 20 }}>
              <Text style={styles.studentInfoLabel}>Section: </Text>
              <View style={styles.studentInfoLine} />
            </View>
          </View>
        </View>

        {/* Assessment Content */}
        {assessment.sections.map((section, sIndex) => (
          <View key={section.id} style={styles.sectionContainer} break={sIndex > 0 && section.questions.length > 5}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Section {String.fromCharCode(65 + sIndex)}
              </Text>
              {section.instructions && (
                <Text style={styles.sectionSubtitle}>{section.instructions}</Text>
              )}
            </View>

            {section.questions.map((q, qIndex) => (
              <View key={q.id} style={styles.questionRow} wrap={false}>
                <Text style={styles.questionNumber}>{qIndex + 1}.</Text>
                
                <View style={styles.questionContent}>
                  <View style={styles.questionTextRow}>
                    <Text style={styles.questionText}>{q.text}</Text>
                    <View style={styles.marksColumn}>
                      <Text style={styles.marksText}>[{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]</Text>
                      <Text style={styles.difficultyTag}>[{getDifficultyLabel(q.difficulty)}]</Text>
                    </View>
                  </View>

                  {/* Options */}
                  {q.options && q.options.length > 0 && (
                    <View style={styles.optionsGrid}>
                      {q.options.map((opt, oIdx) => (
                        <View key={oIdx} style={styles.optionItem}>
                          <Text>({String.fromCharCode(97 + oIdx)}) {opt}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Blank space for non-MCQ */}
                  {(!q.options || q.options.length === 0) && (
                    <View style={styles.blankLinesContainer}>
                      <View style={styles.blankLine} />
                      <View style={styles.blankLine} />
                      {(q.marks > 2 || q.type?.toLowerCase().includes("long")) && (
                        <>
                          <View style={styles.blankLine} />
                          <View style={styles.blankLine} />
                        </>
                      )}
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.endMark}>End of Question Paper</Text>

        {/* Answer Key */}
        <View style={styles.answerKeySection} break>
          <Text style={styles.answerKeyTitle}>Answer Key:</Text>
          {assessment.sections.flatMap(s => s.questions).map((q, idx) => (
            <View key={`ans_${idx}`} style={styles.answerKeyRow} wrap={false}>
              <Text style={styles.answerKeyNumber}>{idx + 1}.</Text>
              <Text style={styles.answerKeyText}>{q.answer || "Answer not provided."}</Text>
            </View>
          ))}
        </View>

      </Page>
    </Document>
  );
};
