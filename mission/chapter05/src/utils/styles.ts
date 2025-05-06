export const getButtonStyle = (isDisabled: boolean) => ({
  padding: 10,
  width: "100%",
  border: "none",
  borderRadius: 8,
  fontWeight: "bold",
  fontSize: 16,
  color: isDisabled ? "#aaa" : "white",
  backgroundColor: isDisabled ? "#444" : "#ff69b4",
  cursor: isDisabled ? "not-allowed" : "pointer",
});
