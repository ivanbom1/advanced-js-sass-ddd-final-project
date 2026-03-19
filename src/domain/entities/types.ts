export type StudentId = string & { readonly __brand: "StudentId" };
export type CourseCode = string & { readonly __brand: "CourseCode" };
export type Email = string & { readonly __brand: "Email" };
export type Credits = number & { readonly __brand: "Credits" };
export type Semester = string & { readonly __brand: "Semester" };
export type EnrollmentId = string & { readonly __brand: "EnrollmentId" };

export function createSemester(raw: string): Semester {
    const validSeasons = ["Fall", "Spring", "Summer"];
    let season = "";
    for (const s of validSeasons) {
        if (raw.startsWith(s)) {
        season = s;
        break;
        }
    }

    if (!season) {
        throw new Error("Semester must start with Fall, Spring, or Summer");
    }

    const year = raw.slice(-4)
    for (const char of year) {
        if (char < "0" || char > "9") {
            throw new Error("Year must contain only digits");
        }
    }

    return raw as Semester;
}

export function createCredits(value: number): Credits {
    const validCredits = [1, 2, 3, 4, 6];
    if (!validCredits.includes(value as Credits)) {
        throw new Error("Credits must be one of: 1, 2, 3, 4, 6");
    }
    
    return value as Credits;
}

export function createStudentId(value: string): StudentId {
    if (!/^STU\d{6}$/.test(value)) {
        throw new Error("StudentId must be STU followed by 6 digits (e.g., STU123456)");
    }
    return value as StudentId;
}

export function createCourseCode(value: string): CourseCode {
    if (!/^[A-Z]{2,4}\d{3}$/.test(value)) {
        throw new Error("CourseCode must be 2-4 letters + 3 digits (e.g., CS101)");
    }
    return value as CourseCode;
}

export function createEmail(value: string): Email {
    if (!value.includes("@") || !value.includes(".")) {
        throw new Error("Email must be valid format (e.g., alice@epita.fr)");
    }
    return value as Email;
}

export function createEnrollmentId(value: string): EnrollmentId {
    if (!value.startsWith("ENR-")) {
        throw new Error("EnrollmentId must start with ENR");
    }
    return value as EnrollmentId;
}