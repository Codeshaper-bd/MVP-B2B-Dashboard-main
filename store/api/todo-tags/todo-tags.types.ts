// import type { TApiResponse, TNullish } from "../common-api-types";

// export enum EStatus {
//   Completed = "completed",
//   NotCompleted = "not_completed",
// }

// /**
// |--------------------------------------------------
// | Create Todo Start
// |--------------------------------------------------
// */
// export type TCreateTodoTagArgs = {
//   body: {
//     name: string;
//   };
// };

// export type TTag = {
//   id?: number;
//   name?: string;
// };

// type TCreateTodoTagData = TTag[] | TNullish;

// export type TCreateTodoTagRes = TApiResponse<TCreateTodoTagData>;
// /**
// |--------------------------------------------------
// | Create Todo End
// |--------------------------------------------------
// */

// /* ******************************************************************************************************************************************************************************************** */

// /**
// |--------------------------------------------------
// | Create Tag For A Todo Start
// |--------------------------------------------------
// */
// export type TCreateTagForATodoArgs = {
//   todoId: number | string | TNullish;
//   body: {
//     name: string;
//   };
// };

// type TCreateTagForATodoData = TTag | TNullish;

// export type TCreateTagForATodoRes = TApiResponse<TCreateTagForATodoData>;
// /**
// |--------------------------------------------------
// | Create Tag For A Todo Start
// |--------------------------------------------------
// */

// /* ******************************************************************************************************************************************************************************************** */

// /**
// |--------------------------------------------------
// | Get All Todo Start
// |--------------------------------------------------
// */
// export type TGetAllTodoArgs = {
//   status?: EStatus;
//   tag?: string;
// } | void;

// export type TGetAllTodoTagData = TTag[] | TNullish;

// export type TGetAllTodoRes = TApiResponse<TGetAllTodoTagData>;

// /**
// |--------------------------------------------------
// | Get All Todo End
// |--------------------------------------------------
// */

// /* ******************************************************************************************************************************************************************************************** */

// /**
// |--------------------------------------------------
// | Get A Todo By Id Start
// |--------------------------------------------------
// */
// // export type TGetATodoArgs = { id: number | string | TNullish };
// // export type TGetATodoData = {
// //   id?: number;
// //   title?: string;
// //   description?: string;
// //   status?: string | TNullish;
// //   created_at?: string | TNullish;
// //   updated_at?: string | TNullish;
// //   due_date?: string | TNullish;
// //   priority?: true;
// //   tags?: TTag[] | TNullish;
// // };

// // export type TGetATodoRes = TApiResponse<TGetATodoData, "GET">;
// /**
// |--------------------------------------------------
// | Get A Todo By Id End
// |--------------------------------------------------
// */

// /* ******************************************************************************************************************************************************************************************** */

// /**
// |--------------------------------------------------
// | Update Todo Tag Start
// |--------------------------------------------------
// */
// // export type TUpdateATodoArgs = TUpdateOptionalArgs<TCreateTodoTagArgs>;
// // export type TUpdateATodoData = {
// //   id?: number;
// //   title?: string;
// //   description?: string;
// //   status?: string | TNullish;
// //   created_at?: string | TNullish;
// //   updated_at?: string | TNullish;
// //   due_date?: string | TNullish;
// //   priority?: true;
// //   tags?: TTag[] | TNullish;
// // };

// // export type TUpdateATodoRes = TApiResponse<TGetATodoData, "PUT">;
// /**
// |--------------------------------------------------
// | Update Todo Tag End
// |--------------------------------------------------
// */

// /* ******************************************************************************************************************************************************************************************** */

// /**
// |--------------------------------------------------
// | Delete Todo Start
// |--------------------------------------------------
// */
// export type TDeleteATodoTagArgs = { id: number | string | TNullish };

// export type TDeleteATodoTagRes = TApiResponse<undefined>;
// /**
// |--------------------------------------------------
// | Delete Todo End
// |--------------------------------------------------
// */

// /**
// |--------------------------------------------------
// | Delete Tag For A Todo Start
// |--------------------------------------------------
// */
// export type TDeleteTagForATodoArgs = {
//   todoId: number | string | TNullish;
//   tagId: number | string | TNullish;
// };

// export type TDeleteTagForATodoRes = TApiResponse<{
//   id?: 5;
//   title?: "string";
//   description?: "string";
//   status?: "not_completed";
//   created_at?: string;
//   updated_at?: string;
//   due_date?: string;
//   priority?: boolean;
//   tags?: TTag[] | TNullish;
// }>;
// /**
// |--------------------------------------------------
// | Delete Tag For A Todo End
// |--------------------------------------------------
// */

// /* ******************************************************************************************************************************************************************************************** */

// /**
// |--------------------------------------------------
// | Create Todo tag for a todo
// |--------------------------------------------------
// */
// // export type TCreateTodoTagArgs = {
// //   todoId: number | string | TNullish;
// //   body: {
// //     name: string;
// //   };
// // };
