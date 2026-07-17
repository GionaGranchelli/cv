package dev.gionag.article;

public record LeadQualification(
    String companyName,
    String contactEmail,
    int companySize,
    String interestArea,
    boolean qualified
) {
    public LeadQualification {
        if (companyName == null || companyName.isBlank()) {
            throw new IllegalArgumentException("companyName is required");
        }
        if (contactEmail == null || !contactEmail.contains("@")) {
            throw new IllegalArgumentException("contactEmail must be an email address");
        }
        if (companySize < 1) {
            throw new IllegalArgumentException("companySize must be positive");
        }
        if (interestArea == null || interestArea.isBlank()) {
            throw new IllegalArgumentException("interestArea is required");
        }
    }
}
