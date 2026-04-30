from services.pdf_service import extract_text_from_pdf
from services.resume_service import process_and_analyze_resume


def resume_analyzer_tool(resume_file=None, resume_text=None):
    """
    Returns:
    {
        "resume_text": str,
        "resume_data": dict
    }
    """

    if not resume_file and not resume_text:
        raise ValueError("No resume input provided")

    # Case 1: File provided
    if resume_file:
        file_bytes = resume_file
        filename = "resume.pdf"

        resume_data = process_and_analyze_resume(file_bytes=file_bytes, filename=filename, raw_text=None)

        extracted_text = extract_text_from_pdf(file_bytes)

    # Case 2: Raw text provided
    else:
        resume_data = process_and_analyze_resume(file_bytes=None, filename=None, raw_text=resume_text)

        extracted_text = resume_text

    return {"resume_text": extracted_text, "resume_data": resume_data}
