  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBaseDescription extends CoursePartBase{
    description:string
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }

  interface CoursePartBasic extends CoursePartBaseDescription {
    kind: "basic"
  }
  
  interface CoursePartBackground extends CoursePartBaseDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartBaseDescription {
    requirements: string[]
    kind: 'special'
  }
  
  export type CoursePart = CoursePartSpecial | CoursePartBasic | CoursePartGroup | CoursePartBackground;