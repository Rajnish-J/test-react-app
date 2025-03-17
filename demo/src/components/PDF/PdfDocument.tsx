import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
});

// Create Document Component
const PdfDocument: React.FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Welcome to React PDF Renderer</Text>
      </View>
      <View style={styles.section}>
        <Text>This is a sample PDF document generated in React.</Text>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
