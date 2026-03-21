import { createStudent, Student } from "./studentEntity";
import { createCourse, Course } from "./courseEntity";
import { createEnrollment, Enrollment } from "./enrollmentEntity";
import { emit } from "../observer/observer";

export function enrollStudentInCourse(
  student: Student,
  course: Course,
  semester: string,
): Enrollment {
  if (course.enrolledCount >= course.capacity) {
    throw new Error(
      `Course is full: ${course.enrolledCount}/${course.capacity} students enrolled`,
    );
  }

  const newCredits = student.enrolledCredits + course.credits;
  if (newCredits > 18) {
    throw new Error(
      `Cannot enroll: ${newCredits} credits exceeds 18 credit limit`,
    );
  }

  const previousCapacity = course.enrolledCount / course.capacity;
  student.enrolledCredits += course.credits;
  course.enrolledCount++;

  const enrollment = createEnrollment(
    `ENR-${Date.now()}`,
    student.id,
    course.code,
    semester,
  );

  emit({
    type: "StudentEnrolled",
    enrollmentId: enrollment.id,
    studentId: student.id,
    courseCode: course.code,
  });

  const currentCapacityRatio = course.enrolledCount / course.capacity;

  if (currentCapacityRatio >= 0.8 && previousCapacity < 0.8) {
    emit({
      type: "CourseCapacityReached",
      courseCode: course.code,
      currentEnrollment: course.enrolledCount,
      capacity: course.capacity,
    });
  }

  if (course.enrolledCount === course.capacity) {
    emit({
      type: "CourseFull",
      courseCode: course.code,
    });
  }

  return enrollment;
}

export function cancelEnrollment(
  enrollment: Enrollment,
  student: Student,
  course: Course,
): void {
  enrollment.status = "cancelled";

  if (student.enrolledCredits) {
    student.enrolledCredits -= course.credits;
  }
  course.enrolledCount--;

  emit({
    type: "EnrollmentCancelled",
    enrollmentId: enrollment.id,
  });
}
