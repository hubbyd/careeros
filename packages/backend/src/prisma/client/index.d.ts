
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model CareerAssessment
 * 
 */
export type CareerAssessment = $Result.DefaultSelection<Prisma.$CareerAssessmentPayload>
/**
 * Model Resume
 * 
 */
export type Resume = $Result.DefaultSelection<Prisma.$ResumePayload>
/**
 * Model InterviewSession
 * 
 */
export type InterviewSession = $Result.DefaultSelection<Prisma.$InterviewSessionPayload>
/**
 * Model InterviewQuestion
 * 
 */
export type InterviewQuestion = $Result.DefaultSelection<Prisma.$InterviewQuestionPayload>
/**
 * Model LearningPlan
 * 
 */
export type LearningPlan = $Result.DefaultSelection<Prisma.$LearningPlanPayload>
/**
 * Model GrowthRecord
 * 
 */
export type GrowthRecord = $Result.DefaultSelection<Prisma.$GrowthRecordPayload>
/**
 * Model AiChatSession
 * 
 */
export type AiChatSession = $Result.DefaultSelection<Prisma.$AiChatSessionPayload>
/**
 * Model AiChatMessage
 * 
 */
export type AiChatMessage = $Result.DefaultSelection<Prisma.$AiChatMessagePayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model Prompt
 * 
 */
export type Prompt = $Result.DefaultSelection<Prisma.$PromptPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.careerAssessment`: Exposes CRUD operations for the **CareerAssessment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CareerAssessments
    * const careerAssessments = await prisma.careerAssessment.findMany()
    * ```
    */
  get careerAssessment(): Prisma.CareerAssessmentDelegate<ExtArgs>;

  /**
   * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resumes
    * const resumes = await prisma.resume.findMany()
    * ```
    */
  get resume(): Prisma.ResumeDelegate<ExtArgs>;

  /**
   * `prisma.interviewSession`: Exposes CRUD operations for the **InterviewSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InterviewSessions
    * const interviewSessions = await prisma.interviewSession.findMany()
    * ```
    */
  get interviewSession(): Prisma.InterviewSessionDelegate<ExtArgs>;

  /**
   * `prisma.interviewQuestion`: Exposes CRUD operations for the **InterviewQuestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InterviewQuestions
    * const interviewQuestions = await prisma.interviewQuestion.findMany()
    * ```
    */
  get interviewQuestion(): Prisma.InterviewQuestionDelegate<ExtArgs>;

  /**
   * `prisma.learningPlan`: Exposes CRUD operations for the **LearningPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningPlans
    * const learningPlans = await prisma.learningPlan.findMany()
    * ```
    */
  get learningPlan(): Prisma.LearningPlanDelegate<ExtArgs>;

  /**
   * `prisma.growthRecord`: Exposes CRUD operations for the **GrowthRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GrowthRecords
    * const growthRecords = await prisma.growthRecord.findMany()
    * ```
    */
  get growthRecord(): Prisma.GrowthRecordDelegate<ExtArgs>;

  /**
   * `prisma.aiChatSession`: Exposes CRUD operations for the **AiChatSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiChatSessions
    * const aiChatSessions = await prisma.aiChatSession.findMany()
    * ```
    */
  get aiChatSession(): Prisma.AiChatSessionDelegate<ExtArgs>;

  /**
   * `prisma.aiChatMessage`: Exposes CRUD operations for the **AiChatMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiChatMessages
    * const aiChatMessages = await prisma.aiChatMessage.findMany()
    * ```
    */
  get aiChatMessage(): Prisma.AiChatMessageDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.prompt`: Exposes CRUD operations for the **Prompt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prompts
    * const prompts = await prisma.prompt.findMany()
    * ```
    */
  get prompt(): Prisma.PromptDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    CareerAssessment: 'CareerAssessment',
    Resume: 'Resume',
    InterviewSession: 'InterviewSession',
    InterviewQuestion: 'InterviewQuestion',
    LearningPlan: 'LearningPlan',
    GrowthRecord: 'GrowthRecord',
    AiChatSession: 'AiChatSession',
    AiChatMessage: 'AiChatMessage',
    Notification: 'Notification',
    Prompt: 'Prompt'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "careerAssessment" | "resume" | "interviewSession" | "interviewQuestion" | "learningPlan" | "growthRecord" | "aiChatSession" | "aiChatMessage" | "notification" | "prompt"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      CareerAssessment: {
        payload: Prisma.$CareerAssessmentPayload<ExtArgs>
        fields: Prisma.CareerAssessmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareerAssessmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerAssessmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareerAssessmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerAssessmentPayload>
          }
          findFirst: {
            args: Prisma.CareerAssessmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerAssessmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareerAssessmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerAssessmentPayload>
          }
          findMany: {
            args: Prisma.CareerAssessmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerAssessmentPayload>[]
          }
          create: {
            args: Prisma.CareerAssessmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerAssessmentPayload>
          }
          createMany: {
            args: Prisma.CareerAssessmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CareerAssessmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerAssessmentPayload>[]
          }
          delete: {
            args: Prisma.CareerAssessmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerAssessmentPayload>
          }
          update: {
            args: Prisma.CareerAssessmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerAssessmentPayload>
          }
          deleteMany: {
            args: Prisma.CareerAssessmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareerAssessmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CareerAssessmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerAssessmentPayload>
          }
          aggregate: {
            args: Prisma.CareerAssessmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCareerAssessment>
          }
          groupBy: {
            args: Prisma.CareerAssessmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareerAssessmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareerAssessmentCountArgs<ExtArgs>
            result: $Utils.Optional<CareerAssessmentCountAggregateOutputType> | number
          }
        }
      }
      Resume: {
        payload: Prisma.$ResumePayload<ExtArgs>
        fields: Prisma.ResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findFirst: {
            args: Prisma.ResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findMany: {
            args: Prisma.ResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          create: {
            args: Prisma.ResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          createMany: {
            args: Prisma.ResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          delete: {
            args: Prisma.ResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          update: {
            args: Prisma.ResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          deleteMany: {
            args: Prisma.ResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          aggregate: {
            args: Prisma.ResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResume>
          }
          groupBy: {
            args: Prisma.ResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeCountAggregateOutputType> | number
          }
        }
      }
      InterviewSession: {
        payload: Prisma.$InterviewSessionPayload<ExtArgs>
        fields: Prisma.InterviewSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InterviewSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InterviewSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>
          }
          findFirst: {
            args: Prisma.InterviewSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InterviewSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>
          }
          findMany: {
            args: Prisma.InterviewSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>[]
          }
          create: {
            args: Prisma.InterviewSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>
          }
          createMany: {
            args: Prisma.InterviewSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InterviewSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>[]
          }
          delete: {
            args: Prisma.InterviewSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>
          }
          update: {
            args: Prisma.InterviewSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>
          }
          deleteMany: {
            args: Prisma.InterviewSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InterviewSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InterviewSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>
          }
          aggregate: {
            args: Prisma.InterviewSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInterviewSession>
          }
          groupBy: {
            args: Prisma.InterviewSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<InterviewSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.InterviewSessionCountArgs<ExtArgs>
            result: $Utils.Optional<InterviewSessionCountAggregateOutputType> | number
          }
        }
      }
      InterviewQuestion: {
        payload: Prisma.$InterviewQuestionPayload<ExtArgs>
        fields: Prisma.InterviewQuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InterviewQuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InterviewQuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          findFirst: {
            args: Prisma.InterviewQuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InterviewQuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          findMany: {
            args: Prisma.InterviewQuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>[]
          }
          create: {
            args: Prisma.InterviewQuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          createMany: {
            args: Prisma.InterviewQuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InterviewQuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>[]
          }
          delete: {
            args: Prisma.InterviewQuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          update: {
            args: Prisma.InterviewQuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          deleteMany: {
            args: Prisma.InterviewQuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InterviewQuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InterviewQuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          aggregate: {
            args: Prisma.InterviewQuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInterviewQuestion>
          }
          groupBy: {
            args: Prisma.InterviewQuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<InterviewQuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.InterviewQuestionCountArgs<ExtArgs>
            result: $Utils.Optional<InterviewQuestionCountAggregateOutputType> | number
          }
        }
      }
      LearningPlan: {
        payload: Prisma.$LearningPlanPayload<ExtArgs>
        fields: Prisma.LearningPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPlanPayload>
          }
          findFirst: {
            args: Prisma.LearningPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPlanPayload>
          }
          findMany: {
            args: Prisma.LearningPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPlanPayload>[]
          }
          create: {
            args: Prisma.LearningPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPlanPayload>
          }
          createMany: {
            args: Prisma.LearningPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPlanPayload>[]
          }
          delete: {
            args: Prisma.LearningPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPlanPayload>
          }
          update: {
            args: Prisma.LearningPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPlanPayload>
          }
          deleteMany: {
            args: Prisma.LearningPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LearningPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPlanPayload>
          }
          aggregate: {
            args: Prisma.LearningPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningPlan>
          }
          groupBy: {
            args: Prisma.LearningPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningPlanCountArgs<ExtArgs>
            result: $Utils.Optional<LearningPlanCountAggregateOutputType> | number
          }
        }
      }
      GrowthRecord: {
        payload: Prisma.$GrowthRecordPayload<ExtArgs>
        fields: Prisma.GrowthRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GrowthRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GrowthRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>
          }
          findFirst: {
            args: Prisma.GrowthRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GrowthRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>
          }
          findMany: {
            args: Prisma.GrowthRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>[]
          }
          create: {
            args: Prisma.GrowthRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>
          }
          createMany: {
            args: Prisma.GrowthRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GrowthRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>[]
          }
          delete: {
            args: Prisma.GrowthRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>
          }
          update: {
            args: Prisma.GrowthRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>
          }
          deleteMany: {
            args: Prisma.GrowthRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GrowthRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GrowthRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>
          }
          aggregate: {
            args: Prisma.GrowthRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGrowthRecord>
          }
          groupBy: {
            args: Prisma.GrowthRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<GrowthRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.GrowthRecordCountArgs<ExtArgs>
            result: $Utils.Optional<GrowthRecordCountAggregateOutputType> | number
          }
        }
      }
      AiChatSession: {
        payload: Prisma.$AiChatSessionPayload<ExtArgs>
        fields: Prisma.AiChatSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiChatSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiChatSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatSessionPayload>
          }
          findFirst: {
            args: Prisma.AiChatSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiChatSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatSessionPayload>
          }
          findMany: {
            args: Prisma.AiChatSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatSessionPayload>[]
          }
          create: {
            args: Prisma.AiChatSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatSessionPayload>
          }
          createMany: {
            args: Prisma.AiChatSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiChatSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatSessionPayload>[]
          }
          delete: {
            args: Prisma.AiChatSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatSessionPayload>
          }
          update: {
            args: Prisma.AiChatSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatSessionPayload>
          }
          deleteMany: {
            args: Prisma.AiChatSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiChatSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AiChatSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatSessionPayload>
          }
          aggregate: {
            args: Prisma.AiChatSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiChatSession>
          }
          groupBy: {
            args: Prisma.AiChatSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiChatSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiChatSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AiChatSessionCountAggregateOutputType> | number
          }
        }
      }
      AiChatMessage: {
        payload: Prisma.$AiChatMessagePayload<ExtArgs>
        fields: Prisma.AiChatMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiChatMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiChatMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatMessagePayload>
          }
          findFirst: {
            args: Prisma.AiChatMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiChatMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatMessagePayload>
          }
          findMany: {
            args: Prisma.AiChatMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatMessagePayload>[]
          }
          create: {
            args: Prisma.AiChatMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatMessagePayload>
          }
          createMany: {
            args: Prisma.AiChatMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiChatMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatMessagePayload>[]
          }
          delete: {
            args: Prisma.AiChatMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatMessagePayload>
          }
          update: {
            args: Prisma.AiChatMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatMessagePayload>
          }
          deleteMany: {
            args: Prisma.AiChatMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiChatMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AiChatMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatMessagePayload>
          }
          aggregate: {
            args: Prisma.AiChatMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiChatMessage>
          }
          groupBy: {
            args: Prisma.AiChatMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiChatMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiChatMessageCountArgs<ExtArgs>
            result: $Utils.Optional<AiChatMessageCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      Prompt: {
        payload: Prisma.$PromptPayload<ExtArgs>
        fields: Prisma.PromptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>
          }
          findFirst: {
            args: Prisma.PromptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>
          }
          findMany: {
            args: Prisma.PromptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>[]
          }
          create: {
            args: Prisma.PromptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>
          }
          createMany: {
            args: Prisma.PromptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PromptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>[]
          }
          delete: {
            args: Prisma.PromptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>
          }
          update: {
            args: Prisma.PromptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>
          }
          deleteMany: {
            args: Prisma.PromptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PromptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>
          }
          aggregate: {
            args: Prisma.PromptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrompt>
          }
          groupBy: {
            args: Prisma.PromptGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromptGroupByOutputType>[]
          }
          count: {
            args: Prisma.PromptCountArgs<ExtArgs>
            result: $Utils.Optional<PromptCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    CareerAssessment: number
    Resume: number
    InterviewSession: number
    LearningPlan: number
    GrowthRecord: number
    AiChatSession: number
    Notification: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    CareerAssessment?: boolean | UserCountOutputTypeCountCareerAssessmentArgs
    Resume?: boolean | UserCountOutputTypeCountResumeArgs
    InterviewSession?: boolean | UserCountOutputTypeCountInterviewSessionArgs
    LearningPlan?: boolean | UserCountOutputTypeCountLearningPlanArgs
    GrowthRecord?: boolean | UserCountOutputTypeCountGrowthRecordArgs
    AiChatSession?: boolean | UserCountOutputTypeCountAiChatSessionArgs
    Notification?: boolean | UserCountOutputTypeCountNotificationArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCareerAssessmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerAssessmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResumeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInterviewSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLearningPlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningPlanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGrowthRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GrowthRecordWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAiChatSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiChatSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type InterviewSessionCountOutputType
   */

  export type InterviewSessionCountOutputType = {
    InterviewQuestion: number
  }

  export type InterviewSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    InterviewQuestion?: boolean | InterviewSessionCountOutputTypeCountInterviewQuestionArgs
  }

  // Custom InputTypes
  /**
   * InterviewSessionCountOutputType without action
   */
  export type InterviewSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSessionCountOutputType
     */
    select?: InterviewSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InterviewSessionCountOutputType without action
   */
  export type InterviewSessionCountOutputTypeCountInterviewQuestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewQuestionWhereInput
  }


  /**
   * Count Type AiChatSessionCountOutputType
   */

  export type AiChatSessionCountOutputType = {
    AiChatMessage: number
  }

  export type AiChatSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    AiChatMessage?: boolean | AiChatSessionCountOutputTypeCountAiChatMessageArgs
  }

  // Custom InputTypes
  /**
   * AiChatSessionCountOutputType without action
   */
  export type AiChatSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSessionCountOutputType
     */
    select?: AiChatSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AiChatSessionCountOutputType without action
   */
  export type AiChatSessionCountOutputTypeCountAiChatMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiChatMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    tokenVersion: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    tokenVersion: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    name: string | null
    avatarUrl: string | null
    phone: string | null
    major: string | null
    education: string | null
    role: string | null
    status: string | null
    tokenVersion: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    name: string | null
    avatarUrl: string | null
    phone: string | null
    major: string | null
    education: string | null
    role: string | null
    status: string | null
    tokenVersion: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    avatarUrl: number
    phone: number
    major: number
    education: number
    role: number
    status: number
    tokenVersion: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    tokenVersion?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    tokenVersion?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    avatarUrl?: true
    phone?: true
    major?: true
    education?: true
    role?: true
    status?: true
    tokenVersion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    avatarUrl?: true
    phone?: true
    major?: true
    education?: true
    role?: true
    status?: true
    tokenVersion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    avatarUrl?: true
    phone?: true
    major?: true
    education?: true
    role?: true
    status?: true
    tokenVersion?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    passwordHash: string
    name: string
    avatarUrl: string | null
    phone: string | null
    major: string | null
    education: string | null
    role: string
    status: string
    tokenVersion: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    avatarUrl?: boolean
    phone?: boolean
    major?: boolean
    education?: boolean
    role?: boolean
    status?: boolean
    tokenVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    CareerAssessment?: boolean | User$CareerAssessmentArgs<ExtArgs>
    Resume?: boolean | User$ResumeArgs<ExtArgs>
    InterviewSession?: boolean | User$InterviewSessionArgs<ExtArgs>
    LearningPlan?: boolean | User$LearningPlanArgs<ExtArgs>
    GrowthRecord?: boolean | User$GrowthRecordArgs<ExtArgs>
    AiChatSession?: boolean | User$AiChatSessionArgs<ExtArgs>
    Notification?: boolean | User$NotificationArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    avatarUrl?: boolean
    phone?: boolean
    major?: boolean
    education?: boolean
    role?: boolean
    status?: boolean
    tokenVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    avatarUrl?: boolean
    phone?: boolean
    major?: boolean
    education?: boolean
    role?: boolean
    status?: boolean
    tokenVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    CareerAssessment?: boolean | User$CareerAssessmentArgs<ExtArgs>
    Resume?: boolean | User$ResumeArgs<ExtArgs>
    InterviewSession?: boolean | User$InterviewSessionArgs<ExtArgs>
    LearningPlan?: boolean | User$LearningPlanArgs<ExtArgs>
    GrowthRecord?: boolean | User$GrowthRecordArgs<ExtArgs>
    AiChatSession?: boolean | User$AiChatSessionArgs<ExtArgs>
    Notification?: boolean | User$NotificationArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      CareerAssessment: Prisma.$CareerAssessmentPayload<ExtArgs>[]
      Resume: Prisma.$ResumePayload<ExtArgs>[]
      InterviewSession: Prisma.$InterviewSessionPayload<ExtArgs>[]
      LearningPlan: Prisma.$LearningPlanPayload<ExtArgs>[]
      GrowthRecord: Prisma.$GrowthRecordPayload<ExtArgs>[]
      AiChatSession: Prisma.$AiChatSessionPayload<ExtArgs>[]
      Notification: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      passwordHash: string
      name: string
      avatarUrl: string | null
      phone: string | null
      major: string | null
      education: string | null
      role: string
      status: string
      tokenVersion: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    CareerAssessment<T extends User$CareerAssessmentArgs<ExtArgs> = {}>(args?: Subset<T, User$CareerAssessmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerAssessmentPayload<ExtArgs>, T, "findMany"> | Null>
    Resume<T extends User$ResumeArgs<ExtArgs> = {}>(args?: Subset<T, User$ResumeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany"> | Null>
    InterviewSession<T extends User$InterviewSessionArgs<ExtArgs> = {}>(args?: Subset<T, User$InterviewSessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findMany"> | Null>
    LearningPlan<T extends User$LearningPlanArgs<ExtArgs> = {}>(args?: Subset<T, User$LearningPlanArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPlanPayload<ExtArgs>, T, "findMany"> | Null>
    GrowthRecord<T extends User$GrowthRecordArgs<ExtArgs> = {}>(args?: Subset<T, User$GrowthRecordArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "findMany"> | Null>
    AiChatSession<T extends User$AiChatSessionArgs<ExtArgs> = {}>(args?: Subset<T, User$AiChatSessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatSessionPayload<ExtArgs>, T, "findMany"> | Null>
    Notification<T extends User$NotificationArgs<ExtArgs> = {}>(args?: Subset<T, User$NotificationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly major: FieldRef<"User", 'String'>
    readonly education: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly tokenVersion: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.CareerAssessment
   */
  export type User$CareerAssessmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerAssessment
     */
    select?: CareerAssessmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerAssessmentInclude<ExtArgs> | null
    where?: CareerAssessmentWhereInput
    orderBy?: CareerAssessmentOrderByWithRelationInput | CareerAssessmentOrderByWithRelationInput[]
    cursor?: CareerAssessmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CareerAssessmentScalarFieldEnum | CareerAssessmentScalarFieldEnum[]
  }

  /**
   * User.Resume
   */
  export type User$ResumeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    cursor?: ResumeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * User.InterviewSession
   */
  export type User$InterviewSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    where?: InterviewSessionWhereInput
    orderBy?: InterviewSessionOrderByWithRelationInput | InterviewSessionOrderByWithRelationInput[]
    cursor?: InterviewSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterviewSessionScalarFieldEnum | InterviewSessionScalarFieldEnum[]
  }

  /**
   * User.LearningPlan
   */
  export type User$LearningPlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPlan
     */
    select?: LearningPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPlanInclude<ExtArgs> | null
    where?: LearningPlanWhereInput
    orderBy?: LearningPlanOrderByWithRelationInput | LearningPlanOrderByWithRelationInput[]
    cursor?: LearningPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LearningPlanScalarFieldEnum | LearningPlanScalarFieldEnum[]
  }

  /**
   * User.GrowthRecord
   */
  export type User$GrowthRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    where?: GrowthRecordWhereInput
    orderBy?: GrowthRecordOrderByWithRelationInput | GrowthRecordOrderByWithRelationInput[]
    cursor?: GrowthRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GrowthRecordScalarFieldEnum | GrowthRecordScalarFieldEnum[]
  }

  /**
   * User.AiChatSession
   */
  export type User$AiChatSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSession
     */
    select?: AiChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatSessionInclude<ExtArgs> | null
    where?: AiChatSessionWhereInput
    orderBy?: AiChatSessionOrderByWithRelationInput | AiChatSessionOrderByWithRelationInput[]
    cursor?: AiChatSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiChatSessionScalarFieldEnum | AiChatSessionScalarFieldEnum[]
  }

  /**
   * User.Notification
   */
  export type User$NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model CareerAssessment
   */

  export type AggregateCareerAssessment = {
    _count: CareerAssessmentCountAggregateOutputType | null
    _avg: CareerAssessmentAvgAggregateOutputType | null
    _sum: CareerAssessmentSumAggregateOutputType | null
    _min: CareerAssessmentMinAggregateOutputType | null
    _max: CareerAssessmentMaxAggregateOutputType | null
  }

  export type CareerAssessmentAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    score: number | null
  }

  export type CareerAssessmentSumAggregateOutputType = {
    id: number | null
    userId: number | null
    score: number | null
  }

  export type CareerAssessmentMinAggregateOutputType = {
    id: number | null
    userId: number | null
    assessmentType: string | null
    inputData: string | null
    resultData: string | null
    score: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CareerAssessmentMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    assessmentType: string | null
    inputData: string | null
    resultData: string | null
    score: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CareerAssessmentCountAggregateOutputType = {
    id: number
    userId: number
    assessmentType: number
    inputData: number
    resultData: number
    score: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CareerAssessmentAvgAggregateInputType = {
    id?: true
    userId?: true
    score?: true
  }

  export type CareerAssessmentSumAggregateInputType = {
    id?: true
    userId?: true
    score?: true
  }

  export type CareerAssessmentMinAggregateInputType = {
    id?: true
    userId?: true
    assessmentType?: true
    inputData?: true
    resultData?: true
    score?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CareerAssessmentMaxAggregateInputType = {
    id?: true
    userId?: true
    assessmentType?: true
    inputData?: true
    resultData?: true
    score?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CareerAssessmentCountAggregateInputType = {
    id?: true
    userId?: true
    assessmentType?: true
    inputData?: true
    resultData?: true
    score?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CareerAssessmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerAssessment to aggregate.
     */
    where?: CareerAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerAssessments to fetch.
     */
    orderBy?: CareerAssessmentOrderByWithRelationInput | CareerAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareerAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerAssessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CareerAssessments
    **/
    _count?: true | CareerAssessmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CareerAssessmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CareerAssessmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareerAssessmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareerAssessmentMaxAggregateInputType
  }

  export type GetCareerAssessmentAggregateType<T extends CareerAssessmentAggregateArgs> = {
        [P in keyof T & keyof AggregateCareerAssessment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareerAssessment[P]>
      : GetScalarType<T[P], AggregateCareerAssessment[P]>
  }




  export type CareerAssessmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerAssessmentWhereInput
    orderBy?: CareerAssessmentOrderByWithAggregationInput | CareerAssessmentOrderByWithAggregationInput[]
    by: CareerAssessmentScalarFieldEnum[] | CareerAssessmentScalarFieldEnum
    having?: CareerAssessmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareerAssessmentCountAggregateInputType | true
    _avg?: CareerAssessmentAvgAggregateInputType
    _sum?: CareerAssessmentSumAggregateInputType
    _min?: CareerAssessmentMinAggregateInputType
    _max?: CareerAssessmentMaxAggregateInputType
  }

  export type CareerAssessmentGroupByOutputType = {
    id: number
    userId: number
    assessmentType: string
    inputData: string
    resultData: string
    score: number | null
    createdAt: Date
    updatedAt: Date
    _count: CareerAssessmentCountAggregateOutputType | null
    _avg: CareerAssessmentAvgAggregateOutputType | null
    _sum: CareerAssessmentSumAggregateOutputType | null
    _min: CareerAssessmentMinAggregateOutputType | null
    _max: CareerAssessmentMaxAggregateOutputType | null
  }

  type GetCareerAssessmentGroupByPayload<T extends CareerAssessmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareerAssessmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareerAssessmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareerAssessmentGroupByOutputType[P]>
            : GetScalarType<T[P], CareerAssessmentGroupByOutputType[P]>
        }
      >
    >


  export type CareerAssessmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    assessmentType?: boolean
    inputData?: boolean
    resultData?: boolean
    score?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerAssessment"]>

  export type CareerAssessmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    assessmentType?: boolean
    inputData?: boolean
    resultData?: boolean
    score?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerAssessment"]>

  export type CareerAssessmentSelectScalar = {
    id?: boolean
    userId?: boolean
    assessmentType?: boolean
    inputData?: boolean
    resultData?: boolean
    score?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CareerAssessmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CareerAssessmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CareerAssessmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CareerAssessment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      assessmentType: string
      inputData: string
      resultData: string
      score: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["careerAssessment"]>
    composites: {}
  }

  type CareerAssessmentGetPayload<S extends boolean | null | undefined | CareerAssessmentDefaultArgs> = $Result.GetResult<Prisma.$CareerAssessmentPayload, S>

  type CareerAssessmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CareerAssessmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CareerAssessmentCountAggregateInputType | true
    }

  export interface CareerAssessmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CareerAssessment'], meta: { name: 'CareerAssessment' } }
    /**
     * Find zero or one CareerAssessment that matches the filter.
     * @param {CareerAssessmentFindUniqueArgs} args - Arguments to find a CareerAssessment
     * @example
     * // Get one CareerAssessment
     * const careerAssessment = await prisma.careerAssessment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareerAssessmentFindUniqueArgs>(args: SelectSubset<T, CareerAssessmentFindUniqueArgs<ExtArgs>>): Prisma__CareerAssessmentClient<$Result.GetResult<Prisma.$CareerAssessmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CareerAssessment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CareerAssessmentFindUniqueOrThrowArgs} args - Arguments to find a CareerAssessment
     * @example
     * // Get one CareerAssessment
     * const careerAssessment = await prisma.careerAssessment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareerAssessmentFindUniqueOrThrowArgs>(args: SelectSubset<T, CareerAssessmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareerAssessmentClient<$Result.GetResult<Prisma.$CareerAssessmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CareerAssessment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerAssessmentFindFirstArgs} args - Arguments to find a CareerAssessment
     * @example
     * // Get one CareerAssessment
     * const careerAssessment = await prisma.careerAssessment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareerAssessmentFindFirstArgs>(args?: SelectSubset<T, CareerAssessmentFindFirstArgs<ExtArgs>>): Prisma__CareerAssessmentClient<$Result.GetResult<Prisma.$CareerAssessmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CareerAssessment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerAssessmentFindFirstOrThrowArgs} args - Arguments to find a CareerAssessment
     * @example
     * // Get one CareerAssessment
     * const careerAssessment = await prisma.careerAssessment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareerAssessmentFindFirstOrThrowArgs>(args?: SelectSubset<T, CareerAssessmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareerAssessmentClient<$Result.GetResult<Prisma.$CareerAssessmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CareerAssessments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerAssessmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CareerAssessments
     * const careerAssessments = await prisma.careerAssessment.findMany()
     * 
     * // Get first 10 CareerAssessments
     * const careerAssessments = await prisma.careerAssessment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const careerAssessmentWithIdOnly = await prisma.careerAssessment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CareerAssessmentFindManyArgs>(args?: SelectSubset<T, CareerAssessmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerAssessmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CareerAssessment.
     * @param {CareerAssessmentCreateArgs} args - Arguments to create a CareerAssessment.
     * @example
     * // Create one CareerAssessment
     * const CareerAssessment = await prisma.careerAssessment.create({
     *   data: {
     *     // ... data to create a CareerAssessment
     *   }
     * })
     * 
     */
    create<T extends CareerAssessmentCreateArgs>(args: SelectSubset<T, CareerAssessmentCreateArgs<ExtArgs>>): Prisma__CareerAssessmentClient<$Result.GetResult<Prisma.$CareerAssessmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CareerAssessments.
     * @param {CareerAssessmentCreateManyArgs} args - Arguments to create many CareerAssessments.
     * @example
     * // Create many CareerAssessments
     * const careerAssessment = await prisma.careerAssessment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareerAssessmentCreateManyArgs>(args?: SelectSubset<T, CareerAssessmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CareerAssessments and returns the data saved in the database.
     * @param {CareerAssessmentCreateManyAndReturnArgs} args - Arguments to create many CareerAssessments.
     * @example
     * // Create many CareerAssessments
     * const careerAssessment = await prisma.careerAssessment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CareerAssessments and only return the `id`
     * const careerAssessmentWithIdOnly = await prisma.careerAssessment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CareerAssessmentCreateManyAndReturnArgs>(args?: SelectSubset<T, CareerAssessmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerAssessmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CareerAssessment.
     * @param {CareerAssessmentDeleteArgs} args - Arguments to delete one CareerAssessment.
     * @example
     * // Delete one CareerAssessment
     * const CareerAssessment = await prisma.careerAssessment.delete({
     *   where: {
     *     // ... filter to delete one CareerAssessment
     *   }
     * })
     * 
     */
    delete<T extends CareerAssessmentDeleteArgs>(args: SelectSubset<T, CareerAssessmentDeleteArgs<ExtArgs>>): Prisma__CareerAssessmentClient<$Result.GetResult<Prisma.$CareerAssessmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CareerAssessment.
     * @param {CareerAssessmentUpdateArgs} args - Arguments to update one CareerAssessment.
     * @example
     * // Update one CareerAssessment
     * const careerAssessment = await prisma.careerAssessment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareerAssessmentUpdateArgs>(args: SelectSubset<T, CareerAssessmentUpdateArgs<ExtArgs>>): Prisma__CareerAssessmentClient<$Result.GetResult<Prisma.$CareerAssessmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CareerAssessments.
     * @param {CareerAssessmentDeleteManyArgs} args - Arguments to filter CareerAssessments to delete.
     * @example
     * // Delete a few CareerAssessments
     * const { count } = await prisma.careerAssessment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareerAssessmentDeleteManyArgs>(args?: SelectSubset<T, CareerAssessmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareerAssessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerAssessmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CareerAssessments
     * const careerAssessment = await prisma.careerAssessment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareerAssessmentUpdateManyArgs>(args: SelectSubset<T, CareerAssessmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CareerAssessment.
     * @param {CareerAssessmentUpsertArgs} args - Arguments to update or create a CareerAssessment.
     * @example
     * // Update or create a CareerAssessment
     * const careerAssessment = await prisma.careerAssessment.upsert({
     *   create: {
     *     // ... data to create a CareerAssessment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CareerAssessment we want to update
     *   }
     * })
     */
    upsert<T extends CareerAssessmentUpsertArgs>(args: SelectSubset<T, CareerAssessmentUpsertArgs<ExtArgs>>): Prisma__CareerAssessmentClient<$Result.GetResult<Prisma.$CareerAssessmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CareerAssessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerAssessmentCountArgs} args - Arguments to filter CareerAssessments to count.
     * @example
     * // Count the number of CareerAssessments
     * const count = await prisma.careerAssessment.count({
     *   where: {
     *     // ... the filter for the CareerAssessments we want to count
     *   }
     * })
    **/
    count<T extends CareerAssessmentCountArgs>(
      args?: Subset<T, CareerAssessmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareerAssessmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CareerAssessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerAssessmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareerAssessmentAggregateArgs>(args: Subset<T, CareerAssessmentAggregateArgs>): Prisma.PrismaPromise<GetCareerAssessmentAggregateType<T>>

    /**
     * Group by CareerAssessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerAssessmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareerAssessmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareerAssessmentGroupByArgs['orderBy'] }
        : { orderBy?: CareerAssessmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareerAssessmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareerAssessmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CareerAssessment model
   */
  readonly fields: CareerAssessmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CareerAssessment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareerAssessmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CareerAssessment model
   */ 
  interface CareerAssessmentFieldRefs {
    readonly id: FieldRef<"CareerAssessment", 'Int'>
    readonly userId: FieldRef<"CareerAssessment", 'Int'>
    readonly assessmentType: FieldRef<"CareerAssessment", 'String'>
    readonly inputData: FieldRef<"CareerAssessment", 'String'>
    readonly resultData: FieldRef<"CareerAssessment", 'String'>
    readonly score: FieldRef<"CareerAssessment", 'Int'>
    readonly createdAt: FieldRef<"CareerAssessment", 'DateTime'>
    readonly updatedAt: FieldRef<"CareerAssessment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CareerAssessment findUnique
   */
  export type CareerAssessmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerAssessment
     */
    select?: CareerAssessmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerAssessmentInclude<ExtArgs> | null
    /**
     * Filter, which CareerAssessment to fetch.
     */
    where: CareerAssessmentWhereUniqueInput
  }

  /**
   * CareerAssessment findUniqueOrThrow
   */
  export type CareerAssessmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerAssessment
     */
    select?: CareerAssessmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerAssessmentInclude<ExtArgs> | null
    /**
     * Filter, which CareerAssessment to fetch.
     */
    where: CareerAssessmentWhereUniqueInput
  }

  /**
   * CareerAssessment findFirst
   */
  export type CareerAssessmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerAssessment
     */
    select?: CareerAssessmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerAssessmentInclude<ExtArgs> | null
    /**
     * Filter, which CareerAssessment to fetch.
     */
    where?: CareerAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerAssessments to fetch.
     */
    orderBy?: CareerAssessmentOrderByWithRelationInput | CareerAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerAssessments.
     */
    cursor?: CareerAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerAssessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerAssessments.
     */
    distinct?: CareerAssessmentScalarFieldEnum | CareerAssessmentScalarFieldEnum[]
  }

  /**
   * CareerAssessment findFirstOrThrow
   */
  export type CareerAssessmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerAssessment
     */
    select?: CareerAssessmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerAssessmentInclude<ExtArgs> | null
    /**
     * Filter, which CareerAssessment to fetch.
     */
    where?: CareerAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerAssessments to fetch.
     */
    orderBy?: CareerAssessmentOrderByWithRelationInput | CareerAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerAssessments.
     */
    cursor?: CareerAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerAssessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerAssessments.
     */
    distinct?: CareerAssessmentScalarFieldEnum | CareerAssessmentScalarFieldEnum[]
  }

  /**
   * CareerAssessment findMany
   */
  export type CareerAssessmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerAssessment
     */
    select?: CareerAssessmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerAssessmentInclude<ExtArgs> | null
    /**
     * Filter, which CareerAssessments to fetch.
     */
    where?: CareerAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerAssessments to fetch.
     */
    orderBy?: CareerAssessmentOrderByWithRelationInput | CareerAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CareerAssessments.
     */
    cursor?: CareerAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerAssessments.
     */
    skip?: number
    distinct?: CareerAssessmentScalarFieldEnum | CareerAssessmentScalarFieldEnum[]
  }

  /**
   * CareerAssessment create
   */
  export type CareerAssessmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerAssessment
     */
    select?: CareerAssessmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerAssessmentInclude<ExtArgs> | null
    /**
     * The data needed to create a CareerAssessment.
     */
    data: XOR<CareerAssessmentCreateInput, CareerAssessmentUncheckedCreateInput>
  }

  /**
   * CareerAssessment createMany
   */
  export type CareerAssessmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CareerAssessments.
     */
    data: CareerAssessmentCreateManyInput | CareerAssessmentCreateManyInput[]
  }

  /**
   * CareerAssessment createManyAndReturn
   */
  export type CareerAssessmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerAssessment
     */
    select?: CareerAssessmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CareerAssessments.
     */
    data: CareerAssessmentCreateManyInput | CareerAssessmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerAssessmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CareerAssessment update
   */
  export type CareerAssessmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerAssessment
     */
    select?: CareerAssessmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerAssessmentInclude<ExtArgs> | null
    /**
     * The data needed to update a CareerAssessment.
     */
    data: XOR<CareerAssessmentUpdateInput, CareerAssessmentUncheckedUpdateInput>
    /**
     * Choose, which CareerAssessment to update.
     */
    where: CareerAssessmentWhereUniqueInput
  }

  /**
   * CareerAssessment updateMany
   */
  export type CareerAssessmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CareerAssessments.
     */
    data: XOR<CareerAssessmentUpdateManyMutationInput, CareerAssessmentUncheckedUpdateManyInput>
    /**
     * Filter which CareerAssessments to update
     */
    where?: CareerAssessmentWhereInput
  }

  /**
   * CareerAssessment upsert
   */
  export type CareerAssessmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerAssessment
     */
    select?: CareerAssessmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerAssessmentInclude<ExtArgs> | null
    /**
     * The filter to search for the CareerAssessment to update in case it exists.
     */
    where: CareerAssessmentWhereUniqueInput
    /**
     * In case the CareerAssessment found by the `where` argument doesn't exist, create a new CareerAssessment with this data.
     */
    create: XOR<CareerAssessmentCreateInput, CareerAssessmentUncheckedCreateInput>
    /**
     * In case the CareerAssessment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareerAssessmentUpdateInput, CareerAssessmentUncheckedUpdateInput>
  }

  /**
   * CareerAssessment delete
   */
  export type CareerAssessmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerAssessment
     */
    select?: CareerAssessmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerAssessmentInclude<ExtArgs> | null
    /**
     * Filter which CareerAssessment to delete.
     */
    where: CareerAssessmentWhereUniqueInput
  }

  /**
   * CareerAssessment deleteMany
   */
  export type CareerAssessmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerAssessments to delete
     */
    where?: CareerAssessmentWhereInput
  }

  /**
   * CareerAssessment without action
   */
  export type CareerAssessmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerAssessment
     */
    select?: CareerAssessmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerAssessmentInclude<ExtArgs> | null
  }


  /**
   * Model Resume
   */

  export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  export type ResumeAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ResumeSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ResumeMinAggregateOutputType = {
    id: number | null
    userId: number | null
    fileName: string | null
    fileUrl: string | null
    parsedData: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    fileName: string | null
    fileUrl: string | null
    parsedData: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeCountAggregateOutputType = {
    id: number
    userId: number
    fileName: number
    fileUrl: number
    parsedData: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ResumeAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ResumeSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ResumeMinAggregateInputType = {
    id?: true
    userId?: true
    fileName?: true
    fileUrl?: true
    parsedData?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResumeMaxAggregateInputType = {
    id?: true
    userId?: true
    fileName?: true
    fileUrl?: true
    parsedData?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResumeCountAggregateInputType = {
    id?: true
    userId?: true
    fileName?: true
    fileUrl?: true
    parsedData?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resume to aggregate.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resumes
    **/
    _count?: true | ResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeMaxAggregateInputType
  }

  export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResume[P]>
      : GetScalarType<T[P], AggregateResume[P]>
  }




  export type ResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithAggregationInput | ResumeOrderByWithAggregationInput[]
    by: ResumeScalarFieldEnum[] | ResumeScalarFieldEnum
    having?: ResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeCountAggregateInputType | true
    _avg?: ResumeAvgAggregateInputType
    _sum?: ResumeSumAggregateInputType
    _min?: ResumeMinAggregateInputType
    _max?: ResumeMaxAggregateInputType
  }

  export type ResumeGroupByOutputType = {
    id: number
    userId: number
    fileName: string
    fileUrl: string
    parsedData: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fileName?: boolean
    fileUrl?: boolean
    parsedData?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fileName?: boolean
    fileUrl?: boolean
    parsedData?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectScalar = {
    id?: boolean
    userId?: boolean
    fileName?: boolean
    fileUrl?: boolean
    parsedData?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resume"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      fileName: string
      fileUrl: string
      parsedData: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["resume"]>
    composites: {}
  }

  type ResumeGetPayload<S extends boolean | null | undefined | ResumeDefaultArgs> = $Result.GetResult<Prisma.$ResumePayload, S>

  type ResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ResumeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ResumeCountAggregateInputType | true
    }

  export interface ResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resume'], meta: { name: 'Resume' } }
    /**
     * Find zero or one Resume that matches the filter.
     * @param {ResumeFindUniqueArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeFindUniqueArgs>(args: SelectSubset<T, ResumeFindUniqueArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Resume that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ResumeFindUniqueOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Resume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeFindFirstArgs>(args?: SelectSubset<T, ResumeFindFirstArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Resume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Resumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resumes
     * const resumes = await prisma.resume.findMany()
     * 
     * // Get first 10 Resumes
     * const resumes = await prisma.resume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeWithIdOnly = await prisma.resume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeFindManyArgs>(args?: SelectSubset<T, ResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Resume.
     * @param {ResumeCreateArgs} args - Arguments to create a Resume.
     * @example
     * // Create one Resume
     * const Resume = await prisma.resume.create({
     *   data: {
     *     // ... data to create a Resume
     *   }
     * })
     * 
     */
    create<T extends ResumeCreateArgs>(args: SelectSubset<T, ResumeCreateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Resumes.
     * @param {ResumeCreateManyArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeCreateManyArgs>(args?: SelectSubset<T, ResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resumes and returns the data saved in the database.
     * @param {ResumeCreateManyAndReturnArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Resume.
     * @param {ResumeDeleteArgs} args - Arguments to delete one Resume.
     * @example
     * // Delete one Resume
     * const Resume = await prisma.resume.delete({
     *   where: {
     *     // ... filter to delete one Resume
     *   }
     * })
     * 
     */
    delete<T extends ResumeDeleteArgs>(args: SelectSubset<T, ResumeDeleteArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Resume.
     * @param {ResumeUpdateArgs} args - Arguments to update one Resume.
     * @example
     * // Update one Resume
     * const resume = await prisma.resume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeUpdateArgs>(args: SelectSubset<T, ResumeUpdateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Resumes.
     * @param {ResumeDeleteManyArgs} args - Arguments to filter Resumes to delete.
     * @example
     * // Delete a few Resumes
     * const { count } = await prisma.resume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeDeleteManyArgs>(args?: SelectSubset<T, ResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeUpdateManyArgs>(args: SelectSubset<T, ResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Resume.
     * @param {ResumeUpsertArgs} args - Arguments to update or create a Resume.
     * @example
     * // Update or create a Resume
     * const resume = await prisma.resume.upsert({
     *   create: {
     *     // ... data to create a Resume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resume we want to update
     *   }
     * })
     */
    upsert<T extends ResumeUpsertArgs>(args: SelectSubset<T, ResumeUpsertArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeCountArgs} args - Arguments to filter Resumes to count.
     * @example
     * // Count the number of Resumes
     * const count = await prisma.resume.count({
     *   where: {
     *     // ... the filter for the Resumes we want to count
     *   }
     * })
    **/
    count<T extends ResumeCountArgs>(
      args?: Subset<T, ResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAggregateArgs>(args: Subset<T, ResumeAggregateArgs>): Prisma.PrismaPromise<GetResumeAggregateType<T>>

    /**
     * Group by Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeGroupByArgs['orderBy'] }
        : { orderBy?: ResumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resume model
   */
  readonly fields: ResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resume model
   */ 
  interface ResumeFieldRefs {
    readonly id: FieldRef<"Resume", 'Int'>
    readonly userId: FieldRef<"Resume", 'Int'>
    readonly fileName: FieldRef<"Resume", 'String'>
    readonly fileUrl: FieldRef<"Resume", 'String'>
    readonly parsedData: FieldRef<"Resume", 'String'>
    readonly status: FieldRef<"Resume", 'String'>
    readonly createdAt: FieldRef<"Resume", 'DateTime'>
    readonly updatedAt: FieldRef<"Resume", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Resume findUnique
   */
  export type ResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findUniqueOrThrow
   */
  export type ResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findFirst
   */
  export type ResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findFirstOrThrow
   */
  export type ResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findMany
   */
  export type ResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resumes to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume create
   */
  export type ResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a Resume.
     */
    data: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
  }

  /**
   * Resume createMany
   */
  export type ResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
  }

  /**
   * Resume createManyAndReturn
   */
  export type ResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resume update
   */
  export type ResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a Resume.
     */
    data: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
    /**
     * Choose, which Resume to update.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume updateMany
   */
  export type ResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
  }

  /**
   * Resume upsert
   */
  export type ResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the Resume to update in case it exists.
     */
    where: ResumeWhereUniqueInput
    /**
     * In case the Resume found by the `where` argument doesn't exist, create a new Resume with this data.
     */
    create: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
    /**
     * In case the Resume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
  }

  /**
   * Resume delete
   */
  export type ResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter which Resume to delete.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume deleteMany
   */
  export type ResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resumes to delete
     */
    where?: ResumeWhereInput
  }

  /**
   * Resume without action
   */
  export type ResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
  }


  /**
   * Model InterviewSession
   */

  export type AggregateInterviewSession = {
    _count: InterviewSessionCountAggregateOutputType | null
    _avg: InterviewSessionAvgAggregateOutputType | null
    _sum: InterviewSessionSumAggregateOutputType | null
    _min: InterviewSessionMinAggregateOutputType | null
    _max: InterviewSessionMaxAggregateOutputType | null
  }

  export type InterviewSessionAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type InterviewSessionSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type InterviewSessionMinAggregateOutputType = {
    id: number | null
    userId: number | null
    jobTitle: string | null
    level: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InterviewSessionMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    jobTitle: string | null
    level: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InterviewSessionCountAggregateOutputType = {
    id: number
    userId: number
    jobTitle: number
    level: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InterviewSessionAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type InterviewSessionSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type InterviewSessionMinAggregateInputType = {
    id?: true
    userId?: true
    jobTitle?: true
    level?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InterviewSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    jobTitle?: true
    level?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InterviewSessionCountAggregateInputType = {
    id?: true
    userId?: true
    jobTitle?: true
    level?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InterviewSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewSession to aggregate.
     */
    where?: InterviewSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewSessions to fetch.
     */
    orderBy?: InterviewSessionOrderByWithRelationInput | InterviewSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InterviewSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InterviewSessions
    **/
    _count?: true | InterviewSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InterviewSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InterviewSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InterviewSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InterviewSessionMaxAggregateInputType
  }

  export type GetInterviewSessionAggregateType<T extends InterviewSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateInterviewSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInterviewSession[P]>
      : GetScalarType<T[P], AggregateInterviewSession[P]>
  }




  export type InterviewSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewSessionWhereInput
    orderBy?: InterviewSessionOrderByWithAggregationInput | InterviewSessionOrderByWithAggregationInput[]
    by: InterviewSessionScalarFieldEnum[] | InterviewSessionScalarFieldEnum
    having?: InterviewSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InterviewSessionCountAggregateInputType | true
    _avg?: InterviewSessionAvgAggregateInputType
    _sum?: InterviewSessionSumAggregateInputType
    _min?: InterviewSessionMinAggregateInputType
    _max?: InterviewSessionMaxAggregateInputType
  }

  export type InterviewSessionGroupByOutputType = {
    id: number
    userId: number
    jobTitle: string
    level: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: InterviewSessionCountAggregateOutputType | null
    _avg: InterviewSessionAvgAggregateOutputType | null
    _sum: InterviewSessionSumAggregateOutputType | null
    _min: InterviewSessionMinAggregateOutputType | null
    _max: InterviewSessionMaxAggregateOutputType | null
  }

  type GetInterviewSessionGroupByPayload<T extends InterviewSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InterviewSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InterviewSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InterviewSessionGroupByOutputType[P]>
            : GetScalarType<T[P], InterviewSessionGroupByOutputType[P]>
        }
      >
    >


  export type InterviewSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobTitle?: boolean
    level?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    InterviewQuestion?: boolean | InterviewSession$InterviewQuestionArgs<ExtArgs>
    _count?: boolean | InterviewSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewSession"]>

  export type InterviewSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobTitle?: boolean
    level?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewSession"]>

  export type InterviewSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    jobTitle?: boolean
    level?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InterviewSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    InterviewQuestion?: boolean | InterviewSession$InterviewQuestionArgs<ExtArgs>
    _count?: boolean | InterviewSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InterviewSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $InterviewSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InterviewSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      InterviewQuestion: Prisma.$InterviewQuestionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      jobTitle: string
      level: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["interviewSession"]>
    composites: {}
  }

  type InterviewSessionGetPayload<S extends boolean | null | undefined | InterviewSessionDefaultArgs> = $Result.GetResult<Prisma.$InterviewSessionPayload, S>

  type InterviewSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InterviewSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InterviewSessionCountAggregateInputType | true
    }

  export interface InterviewSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InterviewSession'], meta: { name: 'InterviewSession' } }
    /**
     * Find zero or one InterviewSession that matches the filter.
     * @param {InterviewSessionFindUniqueArgs} args - Arguments to find a InterviewSession
     * @example
     * // Get one InterviewSession
     * const interviewSession = await prisma.interviewSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InterviewSessionFindUniqueArgs>(args: SelectSubset<T, InterviewSessionFindUniqueArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InterviewSession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InterviewSessionFindUniqueOrThrowArgs} args - Arguments to find a InterviewSession
     * @example
     * // Get one InterviewSession
     * const interviewSession = await prisma.interviewSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InterviewSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, InterviewSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InterviewSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionFindFirstArgs} args - Arguments to find a InterviewSession
     * @example
     * // Get one InterviewSession
     * const interviewSession = await prisma.interviewSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InterviewSessionFindFirstArgs>(args?: SelectSubset<T, InterviewSessionFindFirstArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InterviewSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionFindFirstOrThrowArgs} args - Arguments to find a InterviewSession
     * @example
     * // Get one InterviewSession
     * const interviewSession = await prisma.interviewSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InterviewSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, InterviewSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InterviewSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InterviewSessions
     * const interviewSessions = await prisma.interviewSession.findMany()
     * 
     * // Get first 10 InterviewSessions
     * const interviewSessions = await prisma.interviewSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const interviewSessionWithIdOnly = await prisma.interviewSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InterviewSessionFindManyArgs>(args?: SelectSubset<T, InterviewSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InterviewSession.
     * @param {InterviewSessionCreateArgs} args - Arguments to create a InterviewSession.
     * @example
     * // Create one InterviewSession
     * const InterviewSession = await prisma.interviewSession.create({
     *   data: {
     *     // ... data to create a InterviewSession
     *   }
     * })
     * 
     */
    create<T extends InterviewSessionCreateArgs>(args: SelectSubset<T, InterviewSessionCreateArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InterviewSessions.
     * @param {InterviewSessionCreateManyArgs} args - Arguments to create many InterviewSessions.
     * @example
     * // Create many InterviewSessions
     * const interviewSession = await prisma.interviewSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InterviewSessionCreateManyArgs>(args?: SelectSubset<T, InterviewSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InterviewSessions and returns the data saved in the database.
     * @param {InterviewSessionCreateManyAndReturnArgs} args - Arguments to create many InterviewSessions.
     * @example
     * // Create many InterviewSessions
     * const interviewSession = await prisma.interviewSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InterviewSessions and only return the `id`
     * const interviewSessionWithIdOnly = await prisma.interviewSession.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InterviewSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, InterviewSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a InterviewSession.
     * @param {InterviewSessionDeleteArgs} args - Arguments to delete one InterviewSession.
     * @example
     * // Delete one InterviewSession
     * const InterviewSession = await prisma.interviewSession.delete({
     *   where: {
     *     // ... filter to delete one InterviewSession
     *   }
     * })
     * 
     */
    delete<T extends InterviewSessionDeleteArgs>(args: SelectSubset<T, InterviewSessionDeleteArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InterviewSession.
     * @param {InterviewSessionUpdateArgs} args - Arguments to update one InterviewSession.
     * @example
     * // Update one InterviewSession
     * const interviewSession = await prisma.interviewSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InterviewSessionUpdateArgs>(args: SelectSubset<T, InterviewSessionUpdateArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InterviewSessions.
     * @param {InterviewSessionDeleteManyArgs} args - Arguments to filter InterviewSessions to delete.
     * @example
     * // Delete a few InterviewSessions
     * const { count } = await prisma.interviewSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InterviewSessionDeleteManyArgs>(args?: SelectSubset<T, InterviewSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterviewSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InterviewSessions
     * const interviewSession = await prisma.interviewSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InterviewSessionUpdateManyArgs>(args: SelectSubset<T, InterviewSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InterviewSession.
     * @param {InterviewSessionUpsertArgs} args - Arguments to update or create a InterviewSession.
     * @example
     * // Update or create a InterviewSession
     * const interviewSession = await prisma.interviewSession.upsert({
     *   create: {
     *     // ... data to create a InterviewSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InterviewSession we want to update
     *   }
     * })
     */
    upsert<T extends InterviewSessionUpsertArgs>(args: SelectSubset<T, InterviewSessionUpsertArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InterviewSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionCountArgs} args - Arguments to filter InterviewSessions to count.
     * @example
     * // Count the number of InterviewSessions
     * const count = await prisma.interviewSession.count({
     *   where: {
     *     // ... the filter for the InterviewSessions we want to count
     *   }
     * })
    **/
    count<T extends InterviewSessionCountArgs>(
      args?: Subset<T, InterviewSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InterviewSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InterviewSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InterviewSessionAggregateArgs>(args: Subset<T, InterviewSessionAggregateArgs>): Prisma.PrismaPromise<GetInterviewSessionAggregateType<T>>

    /**
     * Group by InterviewSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InterviewSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InterviewSessionGroupByArgs['orderBy'] }
        : { orderBy?: InterviewSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InterviewSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInterviewSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InterviewSession model
   */
  readonly fields: InterviewSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InterviewSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InterviewSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    InterviewQuestion<T extends InterviewSession$InterviewQuestionArgs<ExtArgs> = {}>(args?: Subset<T, InterviewSession$InterviewQuestionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InterviewSession model
   */ 
  interface InterviewSessionFieldRefs {
    readonly id: FieldRef<"InterviewSession", 'Int'>
    readonly userId: FieldRef<"InterviewSession", 'Int'>
    readonly jobTitle: FieldRef<"InterviewSession", 'String'>
    readonly level: FieldRef<"InterviewSession", 'String'>
    readonly status: FieldRef<"InterviewSession", 'String'>
    readonly createdAt: FieldRef<"InterviewSession", 'DateTime'>
    readonly updatedAt: FieldRef<"InterviewSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InterviewSession findUnique
   */
  export type InterviewSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSession to fetch.
     */
    where: InterviewSessionWhereUniqueInput
  }

  /**
   * InterviewSession findUniqueOrThrow
   */
  export type InterviewSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSession to fetch.
     */
    where: InterviewSessionWhereUniqueInput
  }

  /**
   * InterviewSession findFirst
   */
  export type InterviewSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSession to fetch.
     */
    where?: InterviewSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewSessions to fetch.
     */
    orderBy?: InterviewSessionOrderByWithRelationInput | InterviewSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewSessions.
     */
    cursor?: InterviewSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewSessions.
     */
    distinct?: InterviewSessionScalarFieldEnum | InterviewSessionScalarFieldEnum[]
  }

  /**
   * InterviewSession findFirstOrThrow
   */
  export type InterviewSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSession to fetch.
     */
    where?: InterviewSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewSessions to fetch.
     */
    orderBy?: InterviewSessionOrderByWithRelationInput | InterviewSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewSessions.
     */
    cursor?: InterviewSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewSessions.
     */
    distinct?: InterviewSessionScalarFieldEnum | InterviewSessionScalarFieldEnum[]
  }

  /**
   * InterviewSession findMany
   */
  export type InterviewSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSessions to fetch.
     */
    where?: InterviewSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewSessions to fetch.
     */
    orderBy?: InterviewSessionOrderByWithRelationInput | InterviewSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InterviewSessions.
     */
    cursor?: InterviewSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewSessions.
     */
    skip?: number
    distinct?: InterviewSessionScalarFieldEnum | InterviewSessionScalarFieldEnum[]
  }

  /**
   * InterviewSession create
   */
  export type InterviewSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a InterviewSession.
     */
    data: XOR<InterviewSessionCreateInput, InterviewSessionUncheckedCreateInput>
  }

  /**
   * InterviewSession createMany
   */
  export type InterviewSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InterviewSessions.
     */
    data: InterviewSessionCreateManyInput | InterviewSessionCreateManyInput[]
  }

  /**
   * InterviewSession createManyAndReturn
   */
  export type InterviewSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many InterviewSessions.
     */
    data: InterviewSessionCreateManyInput | InterviewSessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterviewSession update
   */
  export type InterviewSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a InterviewSession.
     */
    data: XOR<InterviewSessionUpdateInput, InterviewSessionUncheckedUpdateInput>
    /**
     * Choose, which InterviewSession to update.
     */
    where: InterviewSessionWhereUniqueInput
  }

  /**
   * InterviewSession updateMany
   */
  export type InterviewSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InterviewSessions.
     */
    data: XOR<InterviewSessionUpdateManyMutationInput, InterviewSessionUncheckedUpdateManyInput>
    /**
     * Filter which InterviewSessions to update
     */
    where?: InterviewSessionWhereInput
  }

  /**
   * InterviewSession upsert
   */
  export type InterviewSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the InterviewSession to update in case it exists.
     */
    where: InterviewSessionWhereUniqueInput
    /**
     * In case the InterviewSession found by the `where` argument doesn't exist, create a new InterviewSession with this data.
     */
    create: XOR<InterviewSessionCreateInput, InterviewSessionUncheckedCreateInput>
    /**
     * In case the InterviewSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InterviewSessionUpdateInput, InterviewSessionUncheckedUpdateInput>
  }

  /**
   * InterviewSession delete
   */
  export type InterviewSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * Filter which InterviewSession to delete.
     */
    where: InterviewSessionWhereUniqueInput
  }

  /**
   * InterviewSession deleteMany
   */
  export type InterviewSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewSessions to delete
     */
    where?: InterviewSessionWhereInput
  }

  /**
   * InterviewSession.InterviewQuestion
   */
  export type InterviewSession$InterviewQuestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    where?: InterviewQuestionWhereInput
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    cursor?: InterviewQuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterviewQuestionScalarFieldEnum | InterviewQuestionScalarFieldEnum[]
  }

  /**
   * InterviewSession without action
   */
  export type InterviewSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
  }


  /**
   * Model InterviewQuestion
   */

  export type AggregateInterviewQuestion = {
    _count: InterviewQuestionCountAggregateOutputType | null
    _avg: InterviewQuestionAvgAggregateOutputType | null
    _sum: InterviewQuestionSumAggregateOutputType | null
    _min: InterviewQuestionMinAggregateOutputType | null
    _max: InterviewQuestionMaxAggregateOutputType | null
  }

  export type InterviewQuestionAvgAggregateOutputType = {
    id: number | null
    sessionId: number | null
  }

  export type InterviewQuestionSumAggregateOutputType = {
    id: number | null
    sessionId: number | null
  }

  export type InterviewQuestionMinAggregateOutputType = {
    id: number | null
    sessionId: number | null
    question: string | null
    answer: string | null
    evaluation: string | null
    nextQuestion: string | null
    createdAt: Date | null
  }

  export type InterviewQuestionMaxAggregateOutputType = {
    id: number | null
    sessionId: number | null
    question: string | null
    answer: string | null
    evaluation: string | null
    nextQuestion: string | null
    createdAt: Date | null
  }

  export type InterviewQuestionCountAggregateOutputType = {
    id: number
    sessionId: number
    question: number
    answer: number
    evaluation: number
    nextQuestion: number
    createdAt: number
    _all: number
  }


  export type InterviewQuestionAvgAggregateInputType = {
    id?: true
    sessionId?: true
  }

  export type InterviewQuestionSumAggregateInputType = {
    id?: true
    sessionId?: true
  }

  export type InterviewQuestionMinAggregateInputType = {
    id?: true
    sessionId?: true
    question?: true
    answer?: true
    evaluation?: true
    nextQuestion?: true
    createdAt?: true
  }

  export type InterviewQuestionMaxAggregateInputType = {
    id?: true
    sessionId?: true
    question?: true
    answer?: true
    evaluation?: true
    nextQuestion?: true
    createdAt?: true
  }

  export type InterviewQuestionCountAggregateInputType = {
    id?: true
    sessionId?: true
    question?: true
    answer?: true
    evaluation?: true
    nextQuestion?: true
    createdAt?: true
    _all?: true
  }

  export type InterviewQuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewQuestion to aggregate.
     */
    where?: InterviewQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewQuestions to fetch.
     */
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InterviewQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InterviewQuestions
    **/
    _count?: true | InterviewQuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InterviewQuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InterviewQuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InterviewQuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InterviewQuestionMaxAggregateInputType
  }

  export type GetInterviewQuestionAggregateType<T extends InterviewQuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateInterviewQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInterviewQuestion[P]>
      : GetScalarType<T[P], AggregateInterviewQuestion[P]>
  }




  export type InterviewQuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewQuestionWhereInput
    orderBy?: InterviewQuestionOrderByWithAggregationInput | InterviewQuestionOrderByWithAggregationInput[]
    by: InterviewQuestionScalarFieldEnum[] | InterviewQuestionScalarFieldEnum
    having?: InterviewQuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InterviewQuestionCountAggregateInputType | true
    _avg?: InterviewQuestionAvgAggregateInputType
    _sum?: InterviewQuestionSumAggregateInputType
    _min?: InterviewQuestionMinAggregateInputType
    _max?: InterviewQuestionMaxAggregateInputType
  }

  export type InterviewQuestionGroupByOutputType = {
    id: number
    sessionId: number
    question: string
    answer: string | null
    evaluation: string | null
    nextQuestion: string | null
    createdAt: Date
    _count: InterviewQuestionCountAggregateOutputType | null
    _avg: InterviewQuestionAvgAggregateOutputType | null
    _sum: InterviewQuestionSumAggregateOutputType | null
    _min: InterviewQuestionMinAggregateOutputType | null
    _max: InterviewQuestionMaxAggregateOutputType | null
  }

  type GetInterviewQuestionGroupByPayload<T extends InterviewQuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InterviewQuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InterviewQuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InterviewQuestionGroupByOutputType[P]>
            : GetScalarType<T[P], InterviewQuestionGroupByOutputType[P]>
        }
      >
    >


  export type InterviewQuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    question?: boolean
    answer?: boolean
    evaluation?: boolean
    nextQuestion?: boolean
    createdAt?: boolean
    session?: boolean | InterviewSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewQuestion"]>

  export type InterviewQuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    question?: boolean
    answer?: boolean
    evaluation?: boolean
    nextQuestion?: boolean
    createdAt?: boolean
    session?: boolean | InterviewSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewQuestion"]>

  export type InterviewQuestionSelectScalar = {
    id?: boolean
    sessionId?: boolean
    question?: boolean
    answer?: boolean
    evaluation?: boolean
    nextQuestion?: boolean
    createdAt?: boolean
  }

  export type InterviewQuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | InterviewSessionDefaultArgs<ExtArgs>
  }
  export type InterviewQuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | InterviewSessionDefaultArgs<ExtArgs>
  }

  export type $InterviewQuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InterviewQuestion"
    objects: {
      session: Prisma.$InterviewSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sessionId: number
      question: string
      answer: string | null
      evaluation: string | null
      nextQuestion: string | null
      createdAt: Date
    }, ExtArgs["result"]["interviewQuestion"]>
    composites: {}
  }

  type InterviewQuestionGetPayload<S extends boolean | null | undefined | InterviewQuestionDefaultArgs> = $Result.GetResult<Prisma.$InterviewQuestionPayload, S>

  type InterviewQuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InterviewQuestionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InterviewQuestionCountAggregateInputType | true
    }

  export interface InterviewQuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InterviewQuestion'], meta: { name: 'InterviewQuestion' } }
    /**
     * Find zero or one InterviewQuestion that matches the filter.
     * @param {InterviewQuestionFindUniqueArgs} args - Arguments to find a InterviewQuestion
     * @example
     * // Get one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InterviewQuestionFindUniqueArgs>(args: SelectSubset<T, InterviewQuestionFindUniqueArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InterviewQuestion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InterviewQuestionFindUniqueOrThrowArgs} args - Arguments to find a InterviewQuestion
     * @example
     * // Get one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InterviewQuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, InterviewQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InterviewQuestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionFindFirstArgs} args - Arguments to find a InterviewQuestion
     * @example
     * // Get one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InterviewQuestionFindFirstArgs>(args?: SelectSubset<T, InterviewQuestionFindFirstArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InterviewQuestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionFindFirstOrThrowArgs} args - Arguments to find a InterviewQuestion
     * @example
     * // Get one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InterviewQuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, InterviewQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InterviewQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InterviewQuestions
     * const interviewQuestions = await prisma.interviewQuestion.findMany()
     * 
     * // Get first 10 InterviewQuestions
     * const interviewQuestions = await prisma.interviewQuestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const interviewQuestionWithIdOnly = await prisma.interviewQuestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InterviewQuestionFindManyArgs>(args?: SelectSubset<T, InterviewQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InterviewQuestion.
     * @param {InterviewQuestionCreateArgs} args - Arguments to create a InterviewQuestion.
     * @example
     * // Create one InterviewQuestion
     * const InterviewQuestion = await prisma.interviewQuestion.create({
     *   data: {
     *     // ... data to create a InterviewQuestion
     *   }
     * })
     * 
     */
    create<T extends InterviewQuestionCreateArgs>(args: SelectSubset<T, InterviewQuestionCreateArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InterviewQuestions.
     * @param {InterviewQuestionCreateManyArgs} args - Arguments to create many InterviewQuestions.
     * @example
     * // Create many InterviewQuestions
     * const interviewQuestion = await prisma.interviewQuestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InterviewQuestionCreateManyArgs>(args?: SelectSubset<T, InterviewQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InterviewQuestions and returns the data saved in the database.
     * @param {InterviewQuestionCreateManyAndReturnArgs} args - Arguments to create many InterviewQuestions.
     * @example
     * // Create many InterviewQuestions
     * const interviewQuestion = await prisma.interviewQuestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InterviewQuestions and only return the `id`
     * const interviewQuestionWithIdOnly = await prisma.interviewQuestion.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InterviewQuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, InterviewQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a InterviewQuestion.
     * @param {InterviewQuestionDeleteArgs} args - Arguments to delete one InterviewQuestion.
     * @example
     * // Delete one InterviewQuestion
     * const InterviewQuestion = await prisma.interviewQuestion.delete({
     *   where: {
     *     // ... filter to delete one InterviewQuestion
     *   }
     * })
     * 
     */
    delete<T extends InterviewQuestionDeleteArgs>(args: SelectSubset<T, InterviewQuestionDeleteArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InterviewQuestion.
     * @param {InterviewQuestionUpdateArgs} args - Arguments to update one InterviewQuestion.
     * @example
     * // Update one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InterviewQuestionUpdateArgs>(args: SelectSubset<T, InterviewQuestionUpdateArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InterviewQuestions.
     * @param {InterviewQuestionDeleteManyArgs} args - Arguments to filter InterviewQuestions to delete.
     * @example
     * // Delete a few InterviewQuestions
     * const { count } = await prisma.interviewQuestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InterviewQuestionDeleteManyArgs>(args?: SelectSubset<T, InterviewQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterviewQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InterviewQuestions
     * const interviewQuestion = await prisma.interviewQuestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InterviewQuestionUpdateManyArgs>(args: SelectSubset<T, InterviewQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InterviewQuestion.
     * @param {InterviewQuestionUpsertArgs} args - Arguments to update or create a InterviewQuestion.
     * @example
     * // Update or create a InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.upsert({
     *   create: {
     *     // ... data to create a InterviewQuestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InterviewQuestion we want to update
     *   }
     * })
     */
    upsert<T extends InterviewQuestionUpsertArgs>(args: SelectSubset<T, InterviewQuestionUpsertArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InterviewQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionCountArgs} args - Arguments to filter InterviewQuestions to count.
     * @example
     * // Count the number of InterviewQuestions
     * const count = await prisma.interviewQuestion.count({
     *   where: {
     *     // ... the filter for the InterviewQuestions we want to count
     *   }
     * })
    **/
    count<T extends InterviewQuestionCountArgs>(
      args?: Subset<T, InterviewQuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InterviewQuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InterviewQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InterviewQuestionAggregateArgs>(args: Subset<T, InterviewQuestionAggregateArgs>): Prisma.PrismaPromise<GetInterviewQuestionAggregateType<T>>

    /**
     * Group by InterviewQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InterviewQuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InterviewQuestionGroupByArgs['orderBy'] }
        : { orderBy?: InterviewQuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InterviewQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInterviewQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InterviewQuestion model
   */
  readonly fields: InterviewQuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InterviewQuestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InterviewQuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends InterviewSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InterviewSessionDefaultArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InterviewQuestion model
   */ 
  interface InterviewQuestionFieldRefs {
    readonly id: FieldRef<"InterviewQuestion", 'Int'>
    readonly sessionId: FieldRef<"InterviewQuestion", 'Int'>
    readonly question: FieldRef<"InterviewQuestion", 'String'>
    readonly answer: FieldRef<"InterviewQuestion", 'String'>
    readonly evaluation: FieldRef<"InterviewQuestion", 'String'>
    readonly nextQuestion: FieldRef<"InterviewQuestion", 'String'>
    readonly createdAt: FieldRef<"InterviewQuestion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InterviewQuestion findUnique
   */
  export type InterviewQuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestion to fetch.
     */
    where: InterviewQuestionWhereUniqueInput
  }

  /**
   * InterviewQuestion findUniqueOrThrow
   */
  export type InterviewQuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestion to fetch.
     */
    where: InterviewQuestionWhereUniqueInput
  }

  /**
   * InterviewQuestion findFirst
   */
  export type InterviewQuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestion to fetch.
     */
    where?: InterviewQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewQuestions to fetch.
     */
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewQuestions.
     */
    cursor?: InterviewQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewQuestions.
     */
    distinct?: InterviewQuestionScalarFieldEnum | InterviewQuestionScalarFieldEnum[]
  }

  /**
   * InterviewQuestion findFirstOrThrow
   */
  export type InterviewQuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestion to fetch.
     */
    where?: InterviewQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewQuestions to fetch.
     */
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewQuestions.
     */
    cursor?: InterviewQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewQuestions.
     */
    distinct?: InterviewQuestionScalarFieldEnum | InterviewQuestionScalarFieldEnum[]
  }

  /**
   * InterviewQuestion findMany
   */
  export type InterviewQuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestions to fetch.
     */
    where?: InterviewQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewQuestions to fetch.
     */
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InterviewQuestions.
     */
    cursor?: InterviewQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewQuestions.
     */
    skip?: number
    distinct?: InterviewQuestionScalarFieldEnum | InterviewQuestionScalarFieldEnum[]
  }

  /**
   * InterviewQuestion create
   */
  export type InterviewQuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a InterviewQuestion.
     */
    data: XOR<InterviewQuestionCreateInput, InterviewQuestionUncheckedCreateInput>
  }

  /**
   * InterviewQuestion createMany
   */
  export type InterviewQuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InterviewQuestions.
     */
    data: InterviewQuestionCreateManyInput | InterviewQuestionCreateManyInput[]
  }

  /**
   * InterviewQuestion createManyAndReturn
   */
  export type InterviewQuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many InterviewQuestions.
     */
    data: InterviewQuestionCreateManyInput | InterviewQuestionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterviewQuestion update
   */
  export type InterviewQuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a InterviewQuestion.
     */
    data: XOR<InterviewQuestionUpdateInput, InterviewQuestionUncheckedUpdateInput>
    /**
     * Choose, which InterviewQuestion to update.
     */
    where: InterviewQuestionWhereUniqueInput
  }

  /**
   * InterviewQuestion updateMany
   */
  export type InterviewQuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InterviewQuestions.
     */
    data: XOR<InterviewQuestionUpdateManyMutationInput, InterviewQuestionUncheckedUpdateManyInput>
    /**
     * Filter which InterviewQuestions to update
     */
    where?: InterviewQuestionWhereInput
  }

  /**
   * InterviewQuestion upsert
   */
  export type InterviewQuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the InterviewQuestion to update in case it exists.
     */
    where: InterviewQuestionWhereUniqueInput
    /**
     * In case the InterviewQuestion found by the `where` argument doesn't exist, create a new InterviewQuestion with this data.
     */
    create: XOR<InterviewQuestionCreateInput, InterviewQuestionUncheckedCreateInput>
    /**
     * In case the InterviewQuestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InterviewQuestionUpdateInput, InterviewQuestionUncheckedUpdateInput>
  }

  /**
   * InterviewQuestion delete
   */
  export type InterviewQuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter which InterviewQuestion to delete.
     */
    where: InterviewQuestionWhereUniqueInput
  }

  /**
   * InterviewQuestion deleteMany
   */
  export type InterviewQuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewQuestions to delete
     */
    where?: InterviewQuestionWhereInput
  }

  /**
   * InterviewQuestion without action
   */
  export type InterviewQuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
  }


  /**
   * Model LearningPlan
   */

  export type AggregateLearningPlan = {
    _count: LearningPlanCountAggregateOutputType | null
    _avg: LearningPlanAvgAggregateOutputType | null
    _sum: LearningPlanSumAggregateOutputType | null
    _min: LearningPlanMinAggregateOutputType | null
    _max: LearningPlanMaxAggregateOutputType | null
  }

  export type LearningPlanAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    progress: number | null
  }

  export type LearningPlanSumAggregateOutputType = {
    id: number | null
    userId: number | null
    progress: number | null
  }

  export type LearningPlanMinAggregateOutputType = {
    id: number | null
    userId: number | null
    title: string | null
    description: string | null
    planData: string | null
    progress: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearningPlanMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    title: string | null
    description: string | null
    planData: string | null
    progress: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearningPlanCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    planData: number
    progress: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LearningPlanAvgAggregateInputType = {
    id?: true
    userId?: true
    progress?: true
  }

  export type LearningPlanSumAggregateInputType = {
    id?: true
    userId?: true
    progress?: true
  }

  export type LearningPlanMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    planData?: true
    progress?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearningPlanMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    planData?: true
    progress?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearningPlanCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    planData?: true
    progress?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LearningPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningPlan to aggregate.
     */
    where?: LearningPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPlans to fetch.
     */
    orderBy?: LearningPlanOrderByWithRelationInput | LearningPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningPlans
    **/
    _count?: true | LearningPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LearningPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LearningPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningPlanMaxAggregateInputType
  }

  export type GetLearningPlanAggregateType<T extends LearningPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningPlan[P]>
      : GetScalarType<T[P], AggregateLearningPlan[P]>
  }




  export type LearningPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningPlanWhereInput
    orderBy?: LearningPlanOrderByWithAggregationInput | LearningPlanOrderByWithAggregationInput[]
    by: LearningPlanScalarFieldEnum[] | LearningPlanScalarFieldEnum
    having?: LearningPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningPlanCountAggregateInputType | true
    _avg?: LearningPlanAvgAggregateInputType
    _sum?: LearningPlanSumAggregateInputType
    _min?: LearningPlanMinAggregateInputType
    _max?: LearningPlanMaxAggregateInputType
  }

  export type LearningPlanGroupByOutputType = {
    id: number
    userId: number
    title: string
    description: string | null
    planData: string
    progress: number
    status: string
    createdAt: Date
    updatedAt: Date
    _count: LearningPlanCountAggregateOutputType | null
    _avg: LearningPlanAvgAggregateOutputType | null
    _sum: LearningPlanSumAggregateOutputType | null
    _min: LearningPlanMinAggregateOutputType | null
    _max: LearningPlanMaxAggregateOutputType | null
  }

  type GetLearningPlanGroupByPayload<T extends LearningPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningPlanGroupByOutputType[P]>
            : GetScalarType<T[P], LearningPlanGroupByOutputType[P]>
        }
      >
    >


  export type LearningPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    planData?: boolean
    progress?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningPlan"]>

  export type LearningPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    planData?: boolean
    progress?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningPlan"]>

  export type LearningPlanSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    planData?: boolean
    progress?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LearningPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LearningPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LearningPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningPlan"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      title: string
      description: string | null
      planData: string
      progress: number
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["learningPlan"]>
    composites: {}
  }

  type LearningPlanGetPayload<S extends boolean | null | undefined | LearningPlanDefaultArgs> = $Result.GetResult<Prisma.$LearningPlanPayload, S>

  type LearningPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LearningPlanFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LearningPlanCountAggregateInputType | true
    }

  export interface LearningPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningPlan'], meta: { name: 'LearningPlan' } }
    /**
     * Find zero or one LearningPlan that matches the filter.
     * @param {LearningPlanFindUniqueArgs} args - Arguments to find a LearningPlan
     * @example
     * // Get one LearningPlan
     * const learningPlan = await prisma.learningPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningPlanFindUniqueArgs>(args: SelectSubset<T, LearningPlanFindUniqueArgs<ExtArgs>>): Prisma__LearningPlanClient<$Result.GetResult<Prisma.$LearningPlanPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LearningPlan that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LearningPlanFindUniqueOrThrowArgs} args - Arguments to find a LearningPlan
     * @example
     * // Get one LearningPlan
     * const learningPlan = await prisma.learningPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningPlanClient<$Result.GetResult<Prisma.$LearningPlanPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LearningPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPlanFindFirstArgs} args - Arguments to find a LearningPlan
     * @example
     * // Get one LearningPlan
     * const learningPlan = await prisma.learningPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningPlanFindFirstArgs>(args?: SelectSubset<T, LearningPlanFindFirstArgs<ExtArgs>>): Prisma__LearningPlanClient<$Result.GetResult<Prisma.$LearningPlanPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LearningPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPlanFindFirstOrThrowArgs} args - Arguments to find a LearningPlan
     * @example
     * // Get one LearningPlan
     * const learningPlan = await prisma.learningPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningPlanClient<$Result.GetResult<Prisma.$LearningPlanPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LearningPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningPlans
     * const learningPlans = await prisma.learningPlan.findMany()
     * 
     * // Get first 10 LearningPlans
     * const learningPlans = await prisma.learningPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningPlanWithIdOnly = await prisma.learningPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningPlanFindManyArgs>(args?: SelectSubset<T, LearningPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPlanPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LearningPlan.
     * @param {LearningPlanCreateArgs} args - Arguments to create a LearningPlan.
     * @example
     * // Create one LearningPlan
     * const LearningPlan = await prisma.learningPlan.create({
     *   data: {
     *     // ... data to create a LearningPlan
     *   }
     * })
     * 
     */
    create<T extends LearningPlanCreateArgs>(args: SelectSubset<T, LearningPlanCreateArgs<ExtArgs>>): Prisma__LearningPlanClient<$Result.GetResult<Prisma.$LearningPlanPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LearningPlans.
     * @param {LearningPlanCreateManyArgs} args - Arguments to create many LearningPlans.
     * @example
     * // Create many LearningPlans
     * const learningPlan = await prisma.learningPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningPlanCreateManyArgs>(args?: SelectSubset<T, LearningPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningPlans and returns the data saved in the database.
     * @param {LearningPlanCreateManyAndReturnArgs} args - Arguments to create many LearningPlans.
     * @example
     * // Create many LearningPlans
     * const learningPlan = await prisma.learningPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningPlans and only return the `id`
     * const learningPlanWithIdOnly = await prisma.learningPlan.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPlanPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LearningPlan.
     * @param {LearningPlanDeleteArgs} args - Arguments to delete one LearningPlan.
     * @example
     * // Delete one LearningPlan
     * const LearningPlan = await prisma.learningPlan.delete({
     *   where: {
     *     // ... filter to delete one LearningPlan
     *   }
     * })
     * 
     */
    delete<T extends LearningPlanDeleteArgs>(args: SelectSubset<T, LearningPlanDeleteArgs<ExtArgs>>): Prisma__LearningPlanClient<$Result.GetResult<Prisma.$LearningPlanPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LearningPlan.
     * @param {LearningPlanUpdateArgs} args - Arguments to update one LearningPlan.
     * @example
     * // Update one LearningPlan
     * const learningPlan = await prisma.learningPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningPlanUpdateArgs>(args: SelectSubset<T, LearningPlanUpdateArgs<ExtArgs>>): Prisma__LearningPlanClient<$Result.GetResult<Prisma.$LearningPlanPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LearningPlans.
     * @param {LearningPlanDeleteManyArgs} args - Arguments to filter LearningPlans to delete.
     * @example
     * // Delete a few LearningPlans
     * const { count } = await prisma.learningPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningPlanDeleteManyArgs>(args?: SelectSubset<T, LearningPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningPlans
     * const learningPlan = await prisma.learningPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningPlanUpdateManyArgs>(args: SelectSubset<T, LearningPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LearningPlan.
     * @param {LearningPlanUpsertArgs} args - Arguments to update or create a LearningPlan.
     * @example
     * // Update or create a LearningPlan
     * const learningPlan = await prisma.learningPlan.upsert({
     *   create: {
     *     // ... data to create a LearningPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningPlan we want to update
     *   }
     * })
     */
    upsert<T extends LearningPlanUpsertArgs>(args: SelectSubset<T, LearningPlanUpsertArgs<ExtArgs>>): Prisma__LearningPlanClient<$Result.GetResult<Prisma.$LearningPlanPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LearningPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPlanCountArgs} args - Arguments to filter LearningPlans to count.
     * @example
     * // Count the number of LearningPlans
     * const count = await prisma.learningPlan.count({
     *   where: {
     *     // ... the filter for the LearningPlans we want to count
     *   }
     * })
    **/
    count<T extends LearningPlanCountArgs>(
      args?: Subset<T, LearningPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningPlanAggregateArgs>(args: Subset<T, LearningPlanAggregateArgs>): Prisma.PrismaPromise<GetLearningPlanAggregateType<T>>

    /**
     * Group by LearningPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningPlanGroupByArgs['orderBy'] }
        : { orderBy?: LearningPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningPlan model
   */
  readonly fields: LearningPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningPlan model
   */ 
  interface LearningPlanFieldRefs {
    readonly id: FieldRef<"LearningPlan", 'Int'>
    readonly userId: FieldRef<"LearningPlan", 'Int'>
    readonly title: FieldRef<"LearningPlan", 'String'>
    readonly description: FieldRef<"LearningPlan", 'String'>
    readonly planData: FieldRef<"LearningPlan", 'String'>
    readonly progress: FieldRef<"LearningPlan", 'Int'>
    readonly status: FieldRef<"LearningPlan", 'String'>
    readonly createdAt: FieldRef<"LearningPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"LearningPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LearningPlan findUnique
   */
  export type LearningPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPlan
     */
    select?: LearningPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPlanInclude<ExtArgs> | null
    /**
     * Filter, which LearningPlan to fetch.
     */
    where: LearningPlanWhereUniqueInput
  }

  /**
   * LearningPlan findUniqueOrThrow
   */
  export type LearningPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPlan
     */
    select?: LearningPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPlanInclude<ExtArgs> | null
    /**
     * Filter, which LearningPlan to fetch.
     */
    where: LearningPlanWhereUniqueInput
  }

  /**
   * LearningPlan findFirst
   */
  export type LearningPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPlan
     */
    select?: LearningPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPlanInclude<ExtArgs> | null
    /**
     * Filter, which LearningPlan to fetch.
     */
    where?: LearningPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPlans to fetch.
     */
    orderBy?: LearningPlanOrderByWithRelationInput | LearningPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningPlans.
     */
    cursor?: LearningPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningPlans.
     */
    distinct?: LearningPlanScalarFieldEnum | LearningPlanScalarFieldEnum[]
  }

  /**
   * LearningPlan findFirstOrThrow
   */
  export type LearningPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPlan
     */
    select?: LearningPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPlanInclude<ExtArgs> | null
    /**
     * Filter, which LearningPlan to fetch.
     */
    where?: LearningPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPlans to fetch.
     */
    orderBy?: LearningPlanOrderByWithRelationInput | LearningPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningPlans.
     */
    cursor?: LearningPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningPlans.
     */
    distinct?: LearningPlanScalarFieldEnum | LearningPlanScalarFieldEnum[]
  }

  /**
   * LearningPlan findMany
   */
  export type LearningPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPlan
     */
    select?: LearningPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPlanInclude<ExtArgs> | null
    /**
     * Filter, which LearningPlans to fetch.
     */
    where?: LearningPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPlans to fetch.
     */
    orderBy?: LearningPlanOrderByWithRelationInput | LearningPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningPlans.
     */
    cursor?: LearningPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPlans.
     */
    skip?: number
    distinct?: LearningPlanScalarFieldEnum | LearningPlanScalarFieldEnum[]
  }

  /**
   * LearningPlan create
   */
  export type LearningPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPlan
     */
    select?: LearningPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a LearningPlan.
     */
    data: XOR<LearningPlanCreateInput, LearningPlanUncheckedCreateInput>
  }

  /**
   * LearningPlan createMany
   */
  export type LearningPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningPlans.
     */
    data: LearningPlanCreateManyInput | LearningPlanCreateManyInput[]
  }

  /**
   * LearningPlan createManyAndReturn
   */
  export type LearningPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPlan
     */
    select?: LearningPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LearningPlans.
     */
    data: LearningPlanCreateManyInput | LearningPlanCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningPlan update
   */
  export type LearningPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPlan
     */
    select?: LearningPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a LearningPlan.
     */
    data: XOR<LearningPlanUpdateInput, LearningPlanUncheckedUpdateInput>
    /**
     * Choose, which LearningPlan to update.
     */
    where: LearningPlanWhereUniqueInput
  }

  /**
   * LearningPlan updateMany
   */
  export type LearningPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningPlans.
     */
    data: XOR<LearningPlanUpdateManyMutationInput, LearningPlanUncheckedUpdateManyInput>
    /**
     * Filter which LearningPlans to update
     */
    where?: LearningPlanWhereInput
  }

  /**
   * LearningPlan upsert
   */
  export type LearningPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPlan
     */
    select?: LearningPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the LearningPlan to update in case it exists.
     */
    where: LearningPlanWhereUniqueInput
    /**
     * In case the LearningPlan found by the `where` argument doesn't exist, create a new LearningPlan with this data.
     */
    create: XOR<LearningPlanCreateInput, LearningPlanUncheckedCreateInput>
    /**
     * In case the LearningPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningPlanUpdateInput, LearningPlanUncheckedUpdateInput>
  }

  /**
   * LearningPlan delete
   */
  export type LearningPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPlan
     */
    select?: LearningPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPlanInclude<ExtArgs> | null
    /**
     * Filter which LearningPlan to delete.
     */
    where: LearningPlanWhereUniqueInput
  }

  /**
   * LearningPlan deleteMany
   */
  export type LearningPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningPlans to delete
     */
    where?: LearningPlanWhereInput
  }

  /**
   * LearningPlan without action
   */
  export type LearningPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPlan
     */
    select?: LearningPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPlanInclude<ExtArgs> | null
  }


  /**
   * Model GrowthRecord
   */

  export type AggregateGrowthRecord = {
    _count: GrowthRecordCountAggregateOutputType | null
    _avg: GrowthRecordAvgAggregateOutputType | null
    _sum: GrowthRecordSumAggregateOutputType | null
    _min: GrowthRecordMinAggregateOutputType | null
    _max: GrowthRecordMaxAggregateOutputType | null
  }

  export type GrowthRecordAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type GrowthRecordSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type GrowthRecordMinAggregateOutputType = {
    id: number | null
    userId: number | null
    type: string | null
    content: string | null
    metadata: string | null
    createdAt: Date | null
  }

  export type GrowthRecordMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    type: string | null
    content: string | null
    metadata: string | null
    createdAt: Date | null
  }

  export type GrowthRecordCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    content: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type GrowthRecordAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type GrowthRecordSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type GrowthRecordMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    content?: true
    metadata?: true
    createdAt?: true
  }

  export type GrowthRecordMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    content?: true
    metadata?: true
    createdAt?: true
  }

  export type GrowthRecordCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    content?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type GrowthRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GrowthRecord to aggregate.
     */
    where?: GrowthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrowthRecords to fetch.
     */
    orderBy?: GrowthRecordOrderByWithRelationInput | GrowthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GrowthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrowthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrowthRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GrowthRecords
    **/
    _count?: true | GrowthRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GrowthRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GrowthRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GrowthRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GrowthRecordMaxAggregateInputType
  }

  export type GetGrowthRecordAggregateType<T extends GrowthRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateGrowthRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGrowthRecord[P]>
      : GetScalarType<T[P], AggregateGrowthRecord[P]>
  }




  export type GrowthRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GrowthRecordWhereInput
    orderBy?: GrowthRecordOrderByWithAggregationInput | GrowthRecordOrderByWithAggregationInput[]
    by: GrowthRecordScalarFieldEnum[] | GrowthRecordScalarFieldEnum
    having?: GrowthRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GrowthRecordCountAggregateInputType | true
    _avg?: GrowthRecordAvgAggregateInputType
    _sum?: GrowthRecordSumAggregateInputType
    _min?: GrowthRecordMinAggregateInputType
    _max?: GrowthRecordMaxAggregateInputType
  }

  export type GrowthRecordGroupByOutputType = {
    id: number
    userId: number
    type: string
    content: string
    metadata: string | null
    createdAt: Date
    _count: GrowthRecordCountAggregateOutputType | null
    _avg: GrowthRecordAvgAggregateOutputType | null
    _sum: GrowthRecordSumAggregateOutputType | null
    _min: GrowthRecordMinAggregateOutputType | null
    _max: GrowthRecordMaxAggregateOutputType | null
  }

  type GetGrowthRecordGroupByPayload<T extends GrowthRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GrowthRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GrowthRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GrowthRecordGroupByOutputType[P]>
            : GetScalarType<T[P], GrowthRecordGroupByOutputType[P]>
        }
      >
    >


  export type GrowthRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    content?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["growthRecord"]>

  export type GrowthRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    content?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["growthRecord"]>

  export type GrowthRecordSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    content?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type GrowthRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GrowthRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GrowthRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GrowthRecord"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      type: string
      content: string
      metadata: string | null
      createdAt: Date
    }, ExtArgs["result"]["growthRecord"]>
    composites: {}
  }

  type GrowthRecordGetPayload<S extends boolean | null | undefined | GrowthRecordDefaultArgs> = $Result.GetResult<Prisma.$GrowthRecordPayload, S>

  type GrowthRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GrowthRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GrowthRecordCountAggregateInputType | true
    }

  export interface GrowthRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GrowthRecord'], meta: { name: 'GrowthRecord' } }
    /**
     * Find zero or one GrowthRecord that matches the filter.
     * @param {GrowthRecordFindUniqueArgs} args - Arguments to find a GrowthRecord
     * @example
     * // Get one GrowthRecord
     * const growthRecord = await prisma.growthRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GrowthRecordFindUniqueArgs>(args: SelectSubset<T, GrowthRecordFindUniqueArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GrowthRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GrowthRecordFindUniqueOrThrowArgs} args - Arguments to find a GrowthRecord
     * @example
     * // Get one GrowthRecord
     * const growthRecord = await prisma.growthRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GrowthRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, GrowthRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GrowthRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordFindFirstArgs} args - Arguments to find a GrowthRecord
     * @example
     * // Get one GrowthRecord
     * const growthRecord = await prisma.growthRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GrowthRecordFindFirstArgs>(args?: SelectSubset<T, GrowthRecordFindFirstArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GrowthRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordFindFirstOrThrowArgs} args - Arguments to find a GrowthRecord
     * @example
     * // Get one GrowthRecord
     * const growthRecord = await prisma.growthRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GrowthRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, GrowthRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GrowthRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GrowthRecords
     * const growthRecords = await prisma.growthRecord.findMany()
     * 
     * // Get first 10 GrowthRecords
     * const growthRecords = await prisma.growthRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const growthRecordWithIdOnly = await prisma.growthRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GrowthRecordFindManyArgs>(args?: SelectSubset<T, GrowthRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GrowthRecord.
     * @param {GrowthRecordCreateArgs} args - Arguments to create a GrowthRecord.
     * @example
     * // Create one GrowthRecord
     * const GrowthRecord = await prisma.growthRecord.create({
     *   data: {
     *     // ... data to create a GrowthRecord
     *   }
     * })
     * 
     */
    create<T extends GrowthRecordCreateArgs>(args: SelectSubset<T, GrowthRecordCreateArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GrowthRecords.
     * @param {GrowthRecordCreateManyArgs} args - Arguments to create many GrowthRecords.
     * @example
     * // Create many GrowthRecords
     * const growthRecord = await prisma.growthRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GrowthRecordCreateManyArgs>(args?: SelectSubset<T, GrowthRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GrowthRecords and returns the data saved in the database.
     * @param {GrowthRecordCreateManyAndReturnArgs} args - Arguments to create many GrowthRecords.
     * @example
     * // Create many GrowthRecords
     * const growthRecord = await prisma.growthRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GrowthRecords and only return the `id`
     * const growthRecordWithIdOnly = await prisma.growthRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GrowthRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, GrowthRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GrowthRecord.
     * @param {GrowthRecordDeleteArgs} args - Arguments to delete one GrowthRecord.
     * @example
     * // Delete one GrowthRecord
     * const GrowthRecord = await prisma.growthRecord.delete({
     *   where: {
     *     // ... filter to delete one GrowthRecord
     *   }
     * })
     * 
     */
    delete<T extends GrowthRecordDeleteArgs>(args: SelectSubset<T, GrowthRecordDeleteArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GrowthRecord.
     * @param {GrowthRecordUpdateArgs} args - Arguments to update one GrowthRecord.
     * @example
     * // Update one GrowthRecord
     * const growthRecord = await prisma.growthRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GrowthRecordUpdateArgs>(args: SelectSubset<T, GrowthRecordUpdateArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GrowthRecords.
     * @param {GrowthRecordDeleteManyArgs} args - Arguments to filter GrowthRecords to delete.
     * @example
     * // Delete a few GrowthRecords
     * const { count } = await prisma.growthRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GrowthRecordDeleteManyArgs>(args?: SelectSubset<T, GrowthRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GrowthRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GrowthRecords
     * const growthRecord = await prisma.growthRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GrowthRecordUpdateManyArgs>(args: SelectSubset<T, GrowthRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GrowthRecord.
     * @param {GrowthRecordUpsertArgs} args - Arguments to update or create a GrowthRecord.
     * @example
     * // Update or create a GrowthRecord
     * const growthRecord = await prisma.growthRecord.upsert({
     *   create: {
     *     // ... data to create a GrowthRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GrowthRecord we want to update
     *   }
     * })
     */
    upsert<T extends GrowthRecordUpsertArgs>(args: SelectSubset<T, GrowthRecordUpsertArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GrowthRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordCountArgs} args - Arguments to filter GrowthRecords to count.
     * @example
     * // Count the number of GrowthRecords
     * const count = await prisma.growthRecord.count({
     *   where: {
     *     // ... the filter for the GrowthRecords we want to count
     *   }
     * })
    **/
    count<T extends GrowthRecordCountArgs>(
      args?: Subset<T, GrowthRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GrowthRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GrowthRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GrowthRecordAggregateArgs>(args: Subset<T, GrowthRecordAggregateArgs>): Prisma.PrismaPromise<GetGrowthRecordAggregateType<T>>

    /**
     * Group by GrowthRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GrowthRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GrowthRecordGroupByArgs['orderBy'] }
        : { orderBy?: GrowthRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GrowthRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGrowthRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GrowthRecord model
   */
  readonly fields: GrowthRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GrowthRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GrowthRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GrowthRecord model
   */ 
  interface GrowthRecordFieldRefs {
    readonly id: FieldRef<"GrowthRecord", 'Int'>
    readonly userId: FieldRef<"GrowthRecord", 'Int'>
    readonly type: FieldRef<"GrowthRecord", 'String'>
    readonly content: FieldRef<"GrowthRecord", 'String'>
    readonly metadata: FieldRef<"GrowthRecord", 'String'>
    readonly createdAt: FieldRef<"GrowthRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GrowthRecord findUnique
   */
  export type GrowthRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * Filter, which GrowthRecord to fetch.
     */
    where: GrowthRecordWhereUniqueInput
  }

  /**
   * GrowthRecord findUniqueOrThrow
   */
  export type GrowthRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * Filter, which GrowthRecord to fetch.
     */
    where: GrowthRecordWhereUniqueInput
  }

  /**
   * GrowthRecord findFirst
   */
  export type GrowthRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * Filter, which GrowthRecord to fetch.
     */
    where?: GrowthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrowthRecords to fetch.
     */
    orderBy?: GrowthRecordOrderByWithRelationInput | GrowthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GrowthRecords.
     */
    cursor?: GrowthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrowthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrowthRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GrowthRecords.
     */
    distinct?: GrowthRecordScalarFieldEnum | GrowthRecordScalarFieldEnum[]
  }

  /**
   * GrowthRecord findFirstOrThrow
   */
  export type GrowthRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * Filter, which GrowthRecord to fetch.
     */
    where?: GrowthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrowthRecords to fetch.
     */
    orderBy?: GrowthRecordOrderByWithRelationInput | GrowthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GrowthRecords.
     */
    cursor?: GrowthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrowthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrowthRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GrowthRecords.
     */
    distinct?: GrowthRecordScalarFieldEnum | GrowthRecordScalarFieldEnum[]
  }

  /**
   * GrowthRecord findMany
   */
  export type GrowthRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * Filter, which GrowthRecords to fetch.
     */
    where?: GrowthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrowthRecords to fetch.
     */
    orderBy?: GrowthRecordOrderByWithRelationInput | GrowthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GrowthRecords.
     */
    cursor?: GrowthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrowthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrowthRecords.
     */
    skip?: number
    distinct?: GrowthRecordScalarFieldEnum | GrowthRecordScalarFieldEnum[]
  }

  /**
   * GrowthRecord create
   */
  export type GrowthRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a GrowthRecord.
     */
    data: XOR<GrowthRecordCreateInput, GrowthRecordUncheckedCreateInput>
  }

  /**
   * GrowthRecord createMany
   */
  export type GrowthRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GrowthRecords.
     */
    data: GrowthRecordCreateManyInput | GrowthRecordCreateManyInput[]
  }

  /**
   * GrowthRecord createManyAndReturn
   */
  export type GrowthRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GrowthRecords.
     */
    data: GrowthRecordCreateManyInput | GrowthRecordCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GrowthRecord update
   */
  export type GrowthRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a GrowthRecord.
     */
    data: XOR<GrowthRecordUpdateInput, GrowthRecordUncheckedUpdateInput>
    /**
     * Choose, which GrowthRecord to update.
     */
    where: GrowthRecordWhereUniqueInput
  }

  /**
   * GrowthRecord updateMany
   */
  export type GrowthRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GrowthRecords.
     */
    data: XOR<GrowthRecordUpdateManyMutationInput, GrowthRecordUncheckedUpdateManyInput>
    /**
     * Filter which GrowthRecords to update
     */
    where?: GrowthRecordWhereInput
  }

  /**
   * GrowthRecord upsert
   */
  export type GrowthRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the GrowthRecord to update in case it exists.
     */
    where: GrowthRecordWhereUniqueInput
    /**
     * In case the GrowthRecord found by the `where` argument doesn't exist, create a new GrowthRecord with this data.
     */
    create: XOR<GrowthRecordCreateInput, GrowthRecordUncheckedCreateInput>
    /**
     * In case the GrowthRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GrowthRecordUpdateInput, GrowthRecordUncheckedUpdateInput>
  }

  /**
   * GrowthRecord delete
   */
  export type GrowthRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * Filter which GrowthRecord to delete.
     */
    where: GrowthRecordWhereUniqueInput
  }

  /**
   * GrowthRecord deleteMany
   */
  export type GrowthRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GrowthRecords to delete
     */
    where?: GrowthRecordWhereInput
  }

  /**
   * GrowthRecord without action
   */
  export type GrowthRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
  }


  /**
   * Model AiChatSession
   */

  export type AggregateAiChatSession = {
    _count: AiChatSessionCountAggregateOutputType | null
    _avg: AiChatSessionAvgAggregateOutputType | null
    _sum: AiChatSessionSumAggregateOutputType | null
    _min: AiChatSessionMinAggregateOutputType | null
    _max: AiChatSessionMaxAggregateOutputType | null
  }

  export type AiChatSessionAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type AiChatSessionSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type AiChatSessionMinAggregateOutputType = {
    id: number | null
    userId: number | null
    chatType: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiChatSessionMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    chatType: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiChatSessionCountAggregateOutputType = {
    id: number
    userId: number
    chatType: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AiChatSessionAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AiChatSessionSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AiChatSessionMinAggregateInputType = {
    id?: true
    userId?: true
    chatType?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiChatSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    chatType?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiChatSessionCountAggregateInputType = {
    id?: true
    userId?: true
    chatType?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AiChatSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiChatSession to aggregate.
     */
    where?: AiChatSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatSessions to fetch.
     */
    orderBy?: AiChatSessionOrderByWithRelationInput | AiChatSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiChatSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiChatSessions
    **/
    _count?: true | AiChatSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiChatSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiChatSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiChatSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiChatSessionMaxAggregateInputType
  }

  export type GetAiChatSessionAggregateType<T extends AiChatSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAiChatSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiChatSession[P]>
      : GetScalarType<T[P], AggregateAiChatSession[P]>
  }




  export type AiChatSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiChatSessionWhereInput
    orderBy?: AiChatSessionOrderByWithAggregationInput | AiChatSessionOrderByWithAggregationInput[]
    by: AiChatSessionScalarFieldEnum[] | AiChatSessionScalarFieldEnum
    having?: AiChatSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiChatSessionCountAggregateInputType | true
    _avg?: AiChatSessionAvgAggregateInputType
    _sum?: AiChatSessionSumAggregateInputType
    _min?: AiChatSessionMinAggregateInputType
    _max?: AiChatSessionMaxAggregateInputType
  }

  export type AiChatSessionGroupByOutputType = {
    id: number
    userId: number
    chatType: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: AiChatSessionCountAggregateOutputType | null
    _avg: AiChatSessionAvgAggregateOutputType | null
    _sum: AiChatSessionSumAggregateOutputType | null
    _min: AiChatSessionMinAggregateOutputType | null
    _max: AiChatSessionMaxAggregateOutputType | null
  }

  type GetAiChatSessionGroupByPayload<T extends AiChatSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiChatSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiChatSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiChatSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AiChatSessionGroupByOutputType[P]>
        }
      >
    >


  export type AiChatSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    chatType?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    AiChatMessage?: boolean | AiChatSession$AiChatMessageArgs<ExtArgs>
    _count?: boolean | AiChatSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiChatSession"]>

  export type AiChatSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    chatType?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiChatSession"]>

  export type AiChatSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    chatType?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AiChatSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    AiChatMessage?: boolean | AiChatSession$AiChatMessageArgs<ExtArgs>
    _count?: boolean | AiChatSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AiChatSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AiChatSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiChatSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      AiChatMessage: Prisma.$AiChatMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      chatType: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aiChatSession"]>
    composites: {}
  }

  type AiChatSessionGetPayload<S extends boolean | null | undefined | AiChatSessionDefaultArgs> = $Result.GetResult<Prisma.$AiChatSessionPayload, S>

  type AiChatSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AiChatSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AiChatSessionCountAggregateInputType | true
    }

  export interface AiChatSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiChatSession'], meta: { name: 'AiChatSession' } }
    /**
     * Find zero or one AiChatSession that matches the filter.
     * @param {AiChatSessionFindUniqueArgs} args - Arguments to find a AiChatSession
     * @example
     * // Get one AiChatSession
     * const aiChatSession = await prisma.aiChatSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiChatSessionFindUniqueArgs>(args: SelectSubset<T, AiChatSessionFindUniqueArgs<ExtArgs>>): Prisma__AiChatSessionClient<$Result.GetResult<Prisma.$AiChatSessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AiChatSession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AiChatSessionFindUniqueOrThrowArgs} args - Arguments to find a AiChatSession
     * @example
     * // Get one AiChatSession
     * const aiChatSession = await prisma.aiChatSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiChatSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AiChatSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiChatSessionClient<$Result.GetResult<Prisma.$AiChatSessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AiChatSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatSessionFindFirstArgs} args - Arguments to find a AiChatSession
     * @example
     * // Get one AiChatSession
     * const aiChatSession = await prisma.aiChatSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiChatSessionFindFirstArgs>(args?: SelectSubset<T, AiChatSessionFindFirstArgs<ExtArgs>>): Prisma__AiChatSessionClient<$Result.GetResult<Prisma.$AiChatSessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AiChatSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatSessionFindFirstOrThrowArgs} args - Arguments to find a AiChatSession
     * @example
     * // Get one AiChatSession
     * const aiChatSession = await prisma.aiChatSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiChatSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AiChatSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiChatSessionClient<$Result.GetResult<Prisma.$AiChatSessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AiChatSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiChatSessions
     * const aiChatSessions = await prisma.aiChatSession.findMany()
     * 
     * // Get first 10 AiChatSessions
     * const aiChatSessions = await prisma.aiChatSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiChatSessionWithIdOnly = await prisma.aiChatSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiChatSessionFindManyArgs>(args?: SelectSubset<T, AiChatSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatSessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AiChatSession.
     * @param {AiChatSessionCreateArgs} args - Arguments to create a AiChatSession.
     * @example
     * // Create one AiChatSession
     * const AiChatSession = await prisma.aiChatSession.create({
     *   data: {
     *     // ... data to create a AiChatSession
     *   }
     * })
     * 
     */
    create<T extends AiChatSessionCreateArgs>(args: SelectSubset<T, AiChatSessionCreateArgs<ExtArgs>>): Prisma__AiChatSessionClient<$Result.GetResult<Prisma.$AiChatSessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AiChatSessions.
     * @param {AiChatSessionCreateManyArgs} args - Arguments to create many AiChatSessions.
     * @example
     * // Create many AiChatSessions
     * const aiChatSession = await prisma.aiChatSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiChatSessionCreateManyArgs>(args?: SelectSubset<T, AiChatSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiChatSessions and returns the data saved in the database.
     * @param {AiChatSessionCreateManyAndReturnArgs} args - Arguments to create many AiChatSessions.
     * @example
     * // Create many AiChatSessions
     * const aiChatSession = await prisma.aiChatSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiChatSessions and only return the `id`
     * const aiChatSessionWithIdOnly = await prisma.aiChatSession.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiChatSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AiChatSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatSessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AiChatSession.
     * @param {AiChatSessionDeleteArgs} args - Arguments to delete one AiChatSession.
     * @example
     * // Delete one AiChatSession
     * const AiChatSession = await prisma.aiChatSession.delete({
     *   where: {
     *     // ... filter to delete one AiChatSession
     *   }
     * })
     * 
     */
    delete<T extends AiChatSessionDeleteArgs>(args: SelectSubset<T, AiChatSessionDeleteArgs<ExtArgs>>): Prisma__AiChatSessionClient<$Result.GetResult<Prisma.$AiChatSessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AiChatSession.
     * @param {AiChatSessionUpdateArgs} args - Arguments to update one AiChatSession.
     * @example
     * // Update one AiChatSession
     * const aiChatSession = await prisma.aiChatSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiChatSessionUpdateArgs>(args: SelectSubset<T, AiChatSessionUpdateArgs<ExtArgs>>): Prisma__AiChatSessionClient<$Result.GetResult<Prisma.$AiChatSessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AiChatSessions.
     * @param {AiChatSessionDeleteManyArgs} args - Arguments to filter AiChatSessions to delete.
     * @example
     * // Delete a few AiChatSessions
     * const { count } = await prisma.aiChatSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiChatSessionDeleteManyArgs>(args?: SelectSubset<T, AiChatSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiChatSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiChatSessions
     * const aiChatSession = await prisma.aiChatSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiChatSessionUpdateManyArgs>(args: SelectSubset<T, AiChatSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AiChatSession.
     * @param {AiChatSessionUpsertArgs} args - Arguments to update or create a AiChatSession.
     * @example
     * // Update or create a AiChatSession
     * const aiChatSession = await prisma.aiChatSession.upsert({
     *   create: {
     *     // ... data to create a AiChatSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiChatSession we want to update
     *   }
     * })
     */
    upsert<T extends AiChatSessionUpsertArgs>(args: SelectSubset<T, AiChatSessionUpsertArgs<ExtArgs>>): Prisma__AiChatSessionClient<$Result.GetResult<Prisma.$AiChatSessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AiChatSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatSessionCountArgs} args - Arguments to filter AiChatSessions to count.
     * @example
     * // Count the number of AiChatSessions
     * const count = await prisma.aiChatSession.count({
     *   where: {
     *     // ... the filter for the AiChatSessions we want to count
     *   }
     * })
    **/
    count<T extends AiChatSessionCountArgs>(
      args?: Subset<T, AiChatSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiChatSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiChatSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiChatSessionAggregateArgs>(args: Subset<T, AiChatSessionAggregateArgs>): Prisma.PrismaPromise<GetAiChatSessionAggregateType<T>>

    /**
     * Group by AiChatSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiChatSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiChatSessionGroupByArgs['orderBy'] }
        : { orderBy?: AiChatSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiChatSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiChatSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiChatSession model
   */
  readonly fields: AiChatSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiChatSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiChatSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    AiChatMessage<T extends AiChatSession$AiChatMessageArgs<ExtArgs> = {}>(args?: Subset<T, AiChatSession$AiChatMessageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatMessagePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiChatSession model
   */ 
  interface AiChatSessionFieldRefs {
    readonly id: FieldRef<"AiChatSession", 'Int'>
    readonly userId: FieldRef<"AiChatSession", 'Int'>
    readonly chatType: FieldRef<"AiChatSession", 'String'>
    readonly status: FieldRef<"AiChatSession", 'String'>
    readonly createdAt: FieldRef<"AiChatSession", 'DateTime'>
    readonly updatedAt: FieldRef<"AiChatSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiChatSession findUnique
   */
  export type AiChatSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSession
     */
    select?: AiChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatSessionInclude<ExtArgs> | null
    /**
     * Filter, which AiChatSession to fetch.
     */
    where: AiChatSessionWhereUniqueInput
  }

  /**
   * AiChatSession findUniqueOrThrow
   */
  export type AiChatSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSession
     */
    select?: AiChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatSessionInclude<ExtArgs> | null
    /**
     * Filter, which AiChatSession to fetch.
     */
    where: AiChatSessionWhereUniqueInput
  }

  /**
   * AiChatSession findFirst
   */
  export type AiChatSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSession
     */
    select?: AiChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatSessionInclude<ExtArgs> | null
    /**
     * Filter, which AiChatSession to fetch.
     */
    where?: AiChatSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatSessions to fetch.
     */
    orderBy?: AiChatSessionOrderByWithRelationInput | AiChatSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiChatSessions.
     */
    cursor?: AiChatSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiChatSessions.
     */
    distinct?: AiChatSessionScalarFieldEnum | AiChatSessionScalarFieldEnum[]
  }

  /**
   * AiChatSession findFirstOrThrow
   */
  export type AiChatSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSession
     */
    select?: AiChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatSessionInclude<ExtArgs> | null
    /**
     * Filter, which AiChatSession to fetch.
     */
    where?: AiChatSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatSessions to fetch.
     */
    orderBy?: AiChatSessionOrderByWithRelationInput | AiChatSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiChatSessions.
     */
    cursor?: AiChatSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiChatSessions.
     */
    distinct?: AiChatSessionScalarFieldEnum | AiChatSessionScalarFieldEnum[]
  }

  /**
   * AiChatSession findMany
   */
  export type AiChatSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSession
     */
    select?: AiChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatSessionInclude<ExtArgs> | null
    /**
     * Filter, which AiChatSessions to fetch.
     */
    where?: AiChatSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatSessions to fetch.
     */
    orderBy?: AiChatSessionOrderByWithRelationInput | AiChatSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiChatSessions.
     */
    cursor?: AiChatSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatSessions.
     */
    skip?: number
    distinct?: AiChatSessionScalarFieldEnum | AiChatSessionScalarFieldEnum[]
  }

  /**
   * AiChatSession create
   */
  export type AiChatSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSession
     */
    select?: AiChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a AiChatSession.
     */
    data: XOR<AiChatSessionCreateInput, AiChatSessionUncheckedCreateInput>
  }

  /**
   * AiChatSession createMany
   */
  export type AiChatSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiChatSessions.
     */
    data: AiChatSessionCreateManyInput | AiChatSessionCreateManyInput[]
  }

  /**
   * AiChatSession createManyAndReturn
   */
  export type AiChatSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSession
     */
    select?: AiChatSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AiChatSessions.
     */
    data: AiChatSessionCreateManyInput | AiChatSessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AiChatSession update
   */
  export type AiChatSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSession
     */
    select?: AiChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a AiChatSession.
     */
    data: XOR<AiChatSessionUpdateInput, AiChatSessionUncheckedUpdateInput>
    /**
     * Choose, which AiChatSession to update.
     */
    where: AiChatSessionWhereUniqueInput
  }

  /**
   * AiChatSession updateMany
   */
  export type AiChatSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiChatSessions.
     */
    data: XOR<AiChatSessionUpdateManyMutationInput, AiChatSessionUncheckedUpdateManyInput>
    /**
     * Filter which AiChatSessions to update
     */
    where?: AiChatSessionWhereInput
  }

  /**
   * AiChatSession upsert
   */
  export type AiChatSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSession
     */
    select?: AiChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the AiChatSession to update in case it exists.
     */
    where: AiChatSessionWhereUniqueInput
    /**
     * In case the AiChatSession found by the `where` argument doesn't exist, create a new AiChatSession with this data.
     */
    create: XOR<AiChatSessionCreateInput, AiChatSessionUncheckedCreateInput>
    /**
     * In case the AiChatSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiChatSessionUpdateInput, AiChatSessionUncheckedUpdateInput>
  }

  /**
   * AiChatSession delete
   */
  export type AiChatSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSession
     */
    select?: AiChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatSessionInclude<ExtArgs> | null
    /**
     * Filter which AiChatSession to delete.
     */
    where: AiChatSessionWhereUniqueInput
  }

  /**
   * AiChatSession deleteMany
   */
  export type AiChatSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiChatSessions to delete
     */
    where?: AiChatSessionWhereInput
  }

  /**
   * AiChatSession.AiChatMessage
   */
  export type AiChatSession$AiChatMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatMessage
     */
    select?: AiChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatMessageInclude<ExtArgs> | null
    where?: AiChatMessageWhereInput
    orderBy?: AiChatMessageOrderByWithRelationInput | AiChatMessageOrderByWithRelationInput[]
    cursor?: AiChatMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiChatMessageScalarFieldEnum | AiChatMessageScalarFieldEnum[]
  }

  /**
   * AiChatSession without action
   */
  export type AiChatSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatSession
     */
    select?: AiChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatSessionInclude<ExtArgs> | null
  }


  /**
   * Model AiChatMessage
   */

  export type AggregateAiChatMessage = {
    _count: AiChatMessageCountAggregateOutputType | null
    _avg: AiChatMessageAvgAggregateOutputType | null
    _sum: AiChatMessageSumAggregateOutputType | null
    _min: AiChatMessageMinAggregateOutputType | null
    _max: AiChatMessageMaxAggregateOutputType | null
  }

  export type AiChatMessageAvgAggregateOutputType = {
    id: number | null
    sessionId: number | null
  }

  export type AiChatMessageSumAggregateOutputType = {
    id: number | null
    sessionId: number | null
  }

  export type AiChatMessageMinAggregateOutputType = {
    id: number | null
    sessionId: number | null
    role: string | null
    content: string | null
    createdAt: Date | null
  }

  export type AiChatMessageMaxAggregateOutputType = {
    id: number | null
    sessionId: number | null
    role: string | null
    content: string | null
    createdAt: Date | null
  }

  export type AiChatMessageCountAggregateOutputType = {
    id: number
    sessionId: number
    role: number
    content: number
    createdAt: number
    _all: number
  }


  export type AiChatMessageAvgAggregateInputType = {
    id?: true
    sessionId?: true
  }

  export type AiChatMessageSumAggregateInputType = {
    id?: true
    sessionId?: true
  }

  export type AiChatMessageMinAggregateInputType = {
    id?: true
    sessionId?: true
    role?: true
    content?: true
    createdAt?: true
  }

  export type AiChatMessageMaxAggregateInputType = {
    id?: true
    sessionId?: true
    role?: true
    content?: true
    createdAt?: true
  }

  export type AiChatMessageCountAggregateInputType = {
    id?: true
    sessionId?: true
    role?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type AiChatMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiChatMessage to aggregate.
     */
    where?: AiChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatMessages to fetch.
     */
    orderBy?: AiChatMessageOrderByWithRelationInput | AiChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiChatMessages
    **/
    _count?: true | AiChatMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiChatMessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiChatMessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiChatMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiChatMessageMaxAggregateInputType
  }

  export type GetAiChatMessageAggregateType<T extends AiChatMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateAiChatMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiChatMessage[P]>
      : GetScalarType<T[P], AggregateAiChatMessage[P]>
  }




  export type AiChatMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiChatMessageWhereInput
    orderBy?: AiChatMessageOrderByWithAggregationInput | AiChatMessageOrderByWithAggregationInput[]
    by: AiChatMessageScalarFieldEnum[] | AiChatMessageScalarFieldEnum
    having?: AiChatMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiChatMessageCountAggregateInputType | true
    _avg?: AiChatMessageAvgAggregateInputType
    _sum?: AiChatMessageSumAggregateInputType
    _min?: AiChatMessageMinAggregateInputType
    _max?: AiChatMessageMaxAggregateInputType
  }

  export type AiChatMessageGroupByOutputType = {
    id: number
    sessionId: number
    role: string
    content: string
    createdAt: Date
    _count: AiChatMessageCountAggregateOutputType | null
    _avg: AiChatMessageAvgAggregateOutputType | null
    _sum: AiChatMessageSumAggregateOutputType | null
    _min: AiChatMessageMinAggregateOutputType | null
    _max: AiChatMessageMaxAggregateOutputType | null
  }

  type GetAiChatMessageGroupByPayload<T extends AiChatMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiChatMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiChatMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiChatMessageGroupByOutputType[P]>
            : GetScalarType<T[P], AiChatMessageGroupByOutputType[P]>
        }
      >
    >


  export type AiChatMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    role?: boolean
    content?: boolean
    createdAt?: boolean
    session?: boolean | AiChatSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiChatMessage"]>

  export type AiChatMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    role?: boolean
    content?: boolean
    createdAt?: boolean
    session?: boolean | AiChatSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiChatMessage"]>

  export type AiChatMessageSelectScalar = {
    id?: boolean
    sessionId?: boolean
    role?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type AiChatMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AiChatSessionDefaultArgs<ExtArgs>
  }
  export type AiChatMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AiChatSessionDefaultArgs<ExtArgs>
  }

  export type $AiChatMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiChatMessage"
    objects: {
      session: Prisma.$AiChatSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sessionId: number
      role: string
      content: string
      createdAt: Date
    }, ExtArgs["result"]["aiChatMessage"]>
    composites: {}
  }

  type AiChatMessageGetPayload<S extends boolean | null | undefined | AiChatMessageDefaultArgs> = $Result.GetResult<Prisma.$AiChatMessagePayload, S>

  type AiChatMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AiChatMessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AiChatMessageCountAggregateInputType | true
    }

  export interface AiChatMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiChatMessage'], meta: { name: 'AiChatMessage' } }
    /**
     * Find zero or one AiChatMessage that matches the filter.
     * @param {AiChatMessageFindUniqueArgs} args - Arguments to find a AiChatMessage
     * @example
     * // Get one AiChatMessage
     * const aiChatMessage = await prisma.aiChatMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiChatMessageFindUniqueArgs>(args: SelectSubset<T, AiChatMessageFindUniqueArgs<ExtArgs>>): Prisma__AiChatMessageClient<$Result.GetResult<Prisma.$AiChatMessagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AiChatMessage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AiChatMessageFindUniqueOrThrowArgs} args - Arguments to find a AiChatMessage
     * @example
     * // Get one AiChatMessage
     * const aiChatMessage = await prisma.aiChatMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiChatMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, AiChatMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiChatMessageClient<$Result.GetResult<Prisma.$AiChatMessagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AiChatMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatMessageFindFirstArgs} args - Arguments to find a AiChatMessage
     * @example
     * // Get one AiChatMessage
     * const aiChatMessage = await prisma.aiChatMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiChatMessageFindFirstArgs>(args?: SelectSubset<T, AiChatMessageFindFirstArgs<ExtArgs>>): Prisma__AiChatMessageClient<$Result.GetResult<Prisma.$AiChatMessagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AiChatMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatMessageFindFirstOrThrowArgs} args - Arguments to find a AiChatMessage
     * @example
     * // Get one AiChatMessage
     * const aiChatMessage = await prisma.aiChatMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiChatMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, AiChatMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiChatMessageClient<$Result.GetResult<Prisma.$AiChatMessagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AiChatMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiChatMessages
     * const aiChatMessages = await prisma.aiChatMessage.findMany()
     * 
     * // Get first 10 AiChatMessages
     * const aiChatMessages = await prisma.aiChatMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiChatMessageWithIdOnly = await prisma.aiChatMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiChatMessageFindManyArgs>(args?: SelectSubset<T, AiChatMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatMessagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AiChatMessage.
     * @param {AiChatMessageCreateArgs} args - Arguments to create a AiChatMessage.
     * @example
     * // Create one AiChatMessage
     * const AiChatMessage = await prisma.aiChatMessage.create({
     *   data: {
     *     // ... data to create a AiChatMessage
     *   }
     * })
     * 
     */
    create<T extends AiChatMessageCreateArgs>(args: SelectSubset<T, AiChatMessageCreateArgs<ExtArgs>>): Prisma__AiChatMessageClient<$Result.GetResult<Prisma.$AiChatMessagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AiChatMessages.
     * @param {AiChatMessageCreateManyArgs} args - Arguments to create many AiChatMessages.
     * @example
     * // Create many AiChatMessages
     * const aiChatMessage = await prisma.aiChatMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiChatMessageCreateManyArgs>(args?: SelectSubset<T, AiChatMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiChatMessages and returns the data saved in the database.
     * @param {AiChatMessageCreateManyAndReturnArgs} args - Arguments to create many AiChatMessages.
     * @example
     * // Create many AiChatMessages
     * const aiChatMessage = await prisma.aiChatMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiChatMessages and only return the `id`
     * const aiChatMessageWithIdOnly = await prisma.aiChatMessage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiChatMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, AiChatMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatMessagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AiChatMessage.
     * @param {AiChatMessageDeleteArgs} args - Arguments to delete one AiChatMessage.
     * @example
     * // Delete one AiChatMessage
     * const AiChatMessage = await prisma.aiChatMessage.delete({
     *   where: {
     *     // ... filter to delete one AiChatMessage
     *   }
     * })
     * 
     */
    delete<T extends AiChatMessageDeleteArgs>(args: SelectSubset<T, AiChatMessageDeleteArgs<ExtArgs>>): Prisma__AiChatMessageClient<$Result.GetResult<Prisma.$AiChatMessagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AiChatMessage.
     * @param {AiChatMessageUpdateArgs} args - Arguments to update one AiChatMessage.
     * @example
     * // Update one AiChatMessage
     * const aiChatMessage = await prisma.aiChatMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiChatMessageUpdateArgs>(args: SelectSubset<T, AiChatMessageUpdateArgs<ExtArgs>>): Prisma__AiChatMessageClient<$Result.GetResult<Prisma.$AiChatMessagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AiChatMessages.
     * @param {AiChatMessageDeleteManyArgs} args - Arguments to filter AiChatMessages to delete.
     * @example
     * // Delete a few AiChatMessages
     * const { count } = await prisma.aiChatMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiChatMessageDeleteManyArgs>(args?: SelectSubset<T, AiChatMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiChatMessages
     * const aiChatMessage = await prisma.aiChatMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiChatMessageUpdateManyArgs>(args: SelectSubset<T, AiChatMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AiChatMessage.
     * @param {AiChatMessageUpsertArgs} args - Arguments to update or create a AiChatMessage.
     * @example
     * // Update or create a AiChatMessage
     * const aiChatMessage = await prisma.aiChatMessage.upsert({
     *   create: {
     *     // ... data to create a AiChatMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiChatMessage we want to update
     *   }
     * })
     */
    upsert<T extends AiChatMessageUpsertArgs>(args: SelectSubset<T, AiChatMessageUpsertArgs<ExtArgs>>): Prisma__AiChatMessageClient<$Result.GetResult<Prisma.$AiChatMessagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AiChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatMessageCountArgs} args - Arguments to filter AiChatMessages to count.
     * @example
     * // Count the number of AiChatMessages
     * const count = await prisma.aiChatMessage.count({
     *   where: {
     *     // ... the filter for the AiChatMessages we want to count
     *   }
     * })
    **/
    count<T extends AiChatMessageCountArgs>(
      args?: Subset<T, AiChatMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiChatMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiChatMessageAggregateArgs>(args: Subset<T, AiChatMessageAggregateArgs>): Prisma.PrismaPromise<GetAiChatMessageAggregateType<T>>

    /**
     * Group by AiChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiChatMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiChatMessageGroupByArgs['orderBy'] }
        : { orderBy?: AiChatMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiChatMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiChatMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiChatMessage model
   */
  readonly fields: AiChatMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiChatMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiChatMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends AiChatSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AiChatSessionDefaultArgs<ExtArgs>>): Prisma__AiChatSessionClient<$Result.GetResult<Prisma.$AiChatSessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiChatMessage model
   */ 
  interface AiChatMessageFieldRefs {
    readonly id: FieldRef<"AiChatMessage", 'Int'>
    readonly sessionId: FieldRef<"AiChatMessage", 'Int'>
    readonly role: FieldRef<"AiChatMessage", 'String'>
    readonly content: FieldRef<"AiChatMessage", 'String'>
    readonly createdAt: FieldRef<"AiChatMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiChatMessage findUnique
   */
  export type AiChatMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatMessage
     */
    select?: AiChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which AiChatMessage to fetch.
     */
    where: AiChatMessageWhereUniqueInput
  }

  /**
   * AiChatMessage findUniqueOrThrow
   */
  export type AiChatMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatMessage
     */
    select?: AiChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which AiChatMessage to fetch.
     */
    where: AiChatMessageWhereUniqueInput
  }

  /**
   * AiChatMessage findFirst
   */
  export type AiChatMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatMessage
     */
    select?: AiChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which AiChatMessage to fetch.
     */
    where?: AiChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatMessages to fetch.
     */
    orderBy?: AiChatMessageOrderByWithRelationInput | AiChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiChatMessages.
     */
    cursor?: AiChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiChatMessages.
     */
    distinct?: AiChatMessageScalarFieldEnum | AiChatMessageScalarFieldEnum[]
  }

  /**
   * AiChatMessage findFirstOrThrow
   */
  export type AiChatMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatMessage
     */
    select?: AiChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which AiChatMessage to fetch.
     */
    where?: AiChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatMessages to fetch.
     */
    orderBy?: AiChatMessageOrderByWithRelationInput | AiChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiChatMessages.
     */
    cursor?: AiChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiChatMessages.
     */
    distinct?: AiChatMessageScalarFieldEnum | AiChatMessageScalarFieldEnum[]
  }

  /**
   * AiChatMessage findMany
   */
  export type AiChatMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatMessage
     */
    select?: AiChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which AiChatMessages to fetch.
     */
    where?: AiChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatMessages to fetch.
     */
    orderBy?: AiChatMessageOrderByWithRelationInput | AiChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiChatMessages.
     */
    cursor?: AiChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatMessages.
     */
    skip?: number
    distinct?: AiChatMessageScalarFieldEnum | AiChatMessageScalarFieldEnum[]
  }

  /**
   * AiChatMessage create
   */
  export type AiChatMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatMessage
     */
    select?: AiChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a AiChatMessage.
     */
    data: XOR<AiChatMessageCreateInput, AiChatMessageUncheckedCreateInput>
  }

  /**
   * AiChatMessage createMany
   */
  export type AiChatMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiChatMessages.
     */
    data: AiChatMessageCreateManyInput | AiChatMessageCreateManyInput[]
  }

  /**
   * AiChatMessage createManyAndReturn
   */
  export type AiChatMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatMessage
     */
    select?: AiChatMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AiChatMessages.
     */
    data: AiChatMessageCreateManyInput | AiChatMessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AiChatMessage update
   */
  export type AiChatMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatMessage
     */
    select?: AiChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a AiChatMessage.
     */
    data: XOR<AiChatMessageUpdateInput, AiChatMessageUncheckedUpdateInput>
    /**
     * Choose, which AiChatMessage to update.
     */
    where: AiChatMessageWhereUniqueInput
  }

  /**
   * AiChatMessage updateMany
   */
  export type AiChatMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiChatMessages.
     */
    data: XOR<AiChatMessageUpdateManyMutationInput, AiChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which AiChatMessages to update
     */
    where?: AiChatMessageWhereInput
  }

  /**
   * AiChatMessage upsert
   */
  export type AiChatMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatMessage
     */
    select?: AiChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the AiChatMessage to update in case it exists.
     */
    where: AiChatMessageWhereUniqueInput
    /**
     * In case the AiChatMessage found by the `where` argument doesn't exist, create a new AiChatMessage with this data.
     */
    create: XOR<AiChatMessageCreateInput, AiChatMessageUncheckedCreateInput>
    /**
     * In case the AiChatMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiChatMessageUpdateInput, AiChatMessageUncheckedUpdateInput>
  }

  /**
   * AiChatMessage delete
   */
  export type AiChatMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatMessage
     */
    select?: AiChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatMessageInclude<ExtArgs> | null
    /**
     * Filter which AiChatMessage to delete.
     */
    where: AiChatMessageWhereUniqueInput
  }

  /**
   * AiChatMessage deleteMany
   */
  export type AiChatMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiChatMessages to delete
     */
    where?: AiChatMessageWhereInput
  }

  /**
   * AiChatMessage without action
   */
  export type AiChatMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatMessage
     */
    select?: AiChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatMessageInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    isRead: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
    userId: number | null
    isRead: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    userId: number | null
    type: string | null
    title: string | null
    content: string | null
    isRead: number | null
    metadata: string | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    type: string | null
    title: string | null
    content: string | null
    isRead: number | null
    metadata: string | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    title: number
    content: number
    isRead: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
    userId?: true
    isRead?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
    userId?: true
    isRead?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    content?: true
    isRead?: true
    metadata?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    content?: true
    isRead?: true
    metadata?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    content?: true
    isRead?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: number
    userId: number
    type: string
    title: string
    content: string
    isRead: number
    metadata: string | null
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    isRead?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    isRead?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    isRead?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      type: string
      title: string
      content: string
      isRead: number
      metadata: string | null
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'Int'>
    readonly userId: FieldRef<"Notification", 'Int'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly content: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Int'>
    readonly metadata: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model Prompt
   */

  export type AggregatePrompt = {
    _count: PromptCountAggregateOutputType | null
    _avg: PromptAvgAggregateOutputType | null
    _sum: PromptSumAggregateOutputType | null
    _min: PromptMinAggregateOutputType | null
    _max: PromptMaxAggregateOutputType | null
  }

  export type PromptAvgAggregateOutputType = {
    id: number | null
    isActive: number | null
  }

  export type PromptSumAggregateOutputType = {
    id: number | null
    isActive: number | null
  }

  export type PromptMinAggregateOutputType = {
    id: number | null
    key: string | null
    name: string | null
    category: string | null
    template: string | null
    variables: string | null
    version: string | null
    isActive: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PromptMaxAggregateOutputType = {
    id: number | null
    key: string | null
    name: string | null
    category: string | null
    template: string | null
    variables: string | null
    version: string | null
    isActive: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PromptCountAggregateOutputType = {
    id: number
    key: number
    name: number
    category: number
    template: number
    variables: number
    version: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PromptAvgAggregateInputType = {
    id?: true
    isActive?: true
  }

  export type PromptSumAggregateInputType = {
    id?: true
    isActive?: true
  }

  export type PromptMinAggregateInputType = {
    id?: true
    key?: true
    name?: true
    category?: true
    template?: true
    variables?: true
    version?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PromptMaxAggregateInputType = {
    id?: true
    key?: true
    name?: true
    category?: true
    template?: true
    variables?: true
    version?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PromptCountAggregateInputType = {
    id?: true
    key?: true
    name?: true
    category?: true
    template?: true
    variables?: true
    version?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PromptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prompt to aggregate.
     */
    where?: PromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prompts to fetch.
     */
    orderBy?: PromptOrderByWithRelationInput | PromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prompts
    **/
    _count?: true | PromptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PromptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PromptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromptMaxAggregateInputType
  }

  export type GetPromptAggregateType<T extends PromptAggregateArgs> = {
        [P in keyof T & keyof AggregatePrompt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrompt[P]>
      : GetScalarType<T[P], AggregatePrompt[P]>
  }




  export type PromptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromptWhereInput
    orderBy?: PromptOrderByWithAggregationInput | PromptOrderByWithAggregationInput[]
    by: PromptScalarFieldEnum[] | PromptScalarFieldEnum
    having?: PromptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromptCountAggregateInputType | true
    _avg?: PromptAvgAggregateInputType
    _sum?: PromptSumAggregateInputType
    _min?: PromptMinAggregateInputType
    _max?: PromptMaxAggregateInputType
  }

  export type PromptGroupByOutputType = {
    id: number
    key: string
    name: string
    category: string
    template: string
    variables: string
    version: string
    isActive: number
    createdAt: Date
    updatedAt: Date
    _count: PromptCountAggregateOutputType | null
    _avg: PromptAvgAggregateOutputType | null
    _sum: PromptSumAggregateOutputType | null
    _min: PromptMinAggregateOutputType | null
    _max: PromptMaxAggregateOutputType | null
  }

  type GetPromptGroupByPayload<T extends PromptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromptGroupByOutputType[P]>
            : GetScalarType<T[P], PromptGroupByOutputType[P]>
        }
      >
    >


  export type PromptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    category?: boolean
    template?: boolean
    variables?: boolean
    version?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["prompt"]>

  export type PromptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    category?: boolean
    template?: boolean
    variables?: boolean
    version?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["prompt"]>

  export type PromptSelectScalar = {
    id?: boolean
    key?: boolean
    name?: boolean
    category?: boolean
    template?: boolean
    variables?: boolean
    version?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $PromptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prompt"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      key: string
      name: string
      category: string
      template: string
      variables: string
      version: string
      isActive: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["prompt"]>
    composites: {}
  }

  type PromptGetPayload<S extends boolean | null | undefined | PromptDefaultArgs> = $Result.GetResult<Prisma.$PromptPayload, S>

  type PromptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PromptFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PromptCountAggregateInputType | true
    }

  export interface PromptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prompt'], meta: { name: 'Prompt' } }
    /**
     * Find zero or one Prompt that matches the filter.
     * @param {PromptFindUniqueArgs} args - Arguments to find a Prompt
     * @example
     * // Get one Prompt
     * const prompt = await prisma.prompt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromptFindUniqueArgs>(args: SelectSubset<T, PromptFindUniqueArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Prompt that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PromptFindUniqueOrThrowArgs} args - Arguments to find a Prompt
     * @example
     * // Get one Prompt
     * const prompt = await prisma.prompt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromptFindUniqueOrThrowArgs>(args: SelectSubset<T, PromptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Prompt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptFindFirstArgs} args - Arguments to find a Prompt
     * @example
     * // Get one Prompt
     * const prompt = await prisma.prompt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromptFindFirstArgs>(args?: SelectSubset<T, PromptFindFirstArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Prompt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptFindFirstOrThrowArgs} args - Arguments to find a Prompt
     * @example
     * // Get one Prompt
     * const prompt = await prisma.prompt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromptFindFirstOrThrowArgs>(args?: SelectSubset<T, PromptFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Prompts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prompts
     * const prompts = await prisma.prompt.findMany()
     * 
     * // Get first 10 Prompts
     * const prompts = await prisma.prompt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promptWithIdOnly = await prisma.prompt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PromptFindManyArgs>(args?: SelectSubset<T, PromptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Prompt.
     * @param {PromptCreateArgs} args - Arguments to create a Prompt.
     * @example
     * // Create one Prompt
     * const Prompt = await prisma.prompt.create({
     *   data: {
     *     // ... data to create a Prompt
     *   }
     * })
     * 
     */
    create<T extends PromptCreateArgs>(args: SelectSubset<T, PromptCreateArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Prompts.
     * @param {PromptCreateManyArgs} args - Arguments to create many Prompts.
     * @example
     * // Create many Prompts
     * const prompt = await prisma.prompt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromptCreateManyArgs>(args?: SelectSubset<T, PromptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prompts and returns the data saved in the database.
     * @param {PromptCreateManyAndReturnArgs} args - Arguments to create many Prompts.
     * @example
     * // Create many Prompts
     * const prompt = await prisma.prompt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prompts and only return the `id`
     * const promptWithIdOnly = await prisma.prompt.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PromptCreateManyAndReturnArgs>(args?: SelectSubset<T, PromptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Prompt.
     * @param {PromptDeleteArgs} args - Arguments to delete one Prompt.
     * @example
     * // Delete one Prompt
     * const Prompt = await prisma.prompt.delete({
     *   where: {
     *     // ... filter to delete one Prompt
     *   }
     * })
     * 
     */
    delete<T extends PromptDeleteArgs>(args: SelectSubset<T, PromptDeleteArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Prompt.
     * @param {PromptUpdateArgs} args - Arguments to update one Prompt.
     * @example
     * // Update one Prompt
     * const prompt = await prisma.prompt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromptUpdateArgs>(args: SelectSubset<T, PromptUpdateArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Prompts.
     * @param {PromptDeleteManyArgs} args - Arguments to filter Prompts to delete.
     * @example
     * // Delete a few Prompts
     * const { count } = await prisma.prompt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromptDeleteManyArgs>(args?: SelectSubset<T, PromptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prompts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prompts
     * const prompt = await prisma.prompt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromptUpdateManyArgs>(args: SelectSubset<T, PromptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Prompt.
     * @param {PromptUpsertArgs} args - Arguments to update or create a Prompt.
     * @example
     * // Update or create a Prompt
     * const prompt = await prisma.prompt.upsert({
     *   create: {
     *     // ... data to create a Prompt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prompt we want to update
     *   }
     * })
     */
    upsert<T extends PromptUpsertArgs>(args: SelectSubset<T, PromptUpsertArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Prompts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptCountArgs} args - Arguments to filter Prompts to count.
     * @example
     * // Count the number of Prompts
     * const count = await prisma.prompt.count({
     *   where: {
     *     // ... the filter for the Prompts we want to count
     *   }
     * })
    **/
    count<T extends PromptCountArgs>(
      args?: Subset<T, PromptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prompt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromptAggregateArgs>(args: Subset<T, PromptAggregateArgs>): Prisma.PrismaPromise<GetPromptAggregateType<T>>

    /**
     * Group by Prompt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PromptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromptGroupByArgs['orderBy'] }
        : { orderBy?: PromptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PromptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prompt model
   */
  readonly fields: PromptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prompt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Prompt model
   */ 
  interface PromptFieldRefs {
    readonly id: FieldRef<"Prompt", 'Int'>
    readonly key: FieldRef<"Prompt", 'String'>
    readonly name: FieldRef<"Prompt", 'String'>
    readonly category: FieldRef<"Prompt", 'String'>
    readonly template: FieldRef<"Prompt", 'String'>
    readonly variables: FieldRef<"Prompt", 'String'>
    readonly version: FieldRef<"Prompt", 'String'>
    readonly isActive: FieldRef<"Prompt", 'Int'>
    readonly createdAt: FieldRef<"Prompt", 'DateTime'>
    readonly updatedAt: FieldRef<"Prompt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Prompt findUnique
   */
  export type PromptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * Filter, which Prompt to fetch.
     */
    where: PromptWhereUniqueInput
  }

  /**
   * Prompt findUniqueOrThrow
   */
  export type PromptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * Filter, which Prompt to fetch.
     */
    where: PromptWhereUniqueInput
  }

  /**
   * Prompt findFirst
   */
  export type PromptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * Filter, which Prompt to fetch.
     */
    where?: PromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prompts to fetch.
     */
    orderBy?: PromptOrderByWithRelationInput | PromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prompts.
     */
    cursor?: PromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prompts.
     */
    distinct?: PromptScalarFieldEnum | PromptScalarFieldEnum[]
  }

  /**
   * Prompt findFirstOrThrow
   */
  export type PromptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * Filter, which Prompt to fetch.
     */
    where?: PromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prompts to fetch.
     */
    orderBy?: PromptOrderByWithRelationInput | PromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prompts.
     */
    cursor?: PromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prompts.
     */
    distinct?: PromptScalarFieldEnum | PromptScalarFieldEnum[]
  }

  /**
   * Prompt findMany
   */
  export type PromptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * Filter, which Prompts to fetch.
     */
    where?: PromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prompts to fetch.
     */
    orderBy?: PromptOrderByWithRelationInput | PromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prompts.
     */
    cursor?: PromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prompts.
     */
    skip?: number
    distinct?: PromptScalarFieldEnum | PromptScalarFieldEnum[]
  }

  /**
   * Prompt create
   */
  export type PromptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * The data needed to create a Prompt.
     */
    data: XOR<PromptCreateInput, PromptUncheckedCreateInput>
  }

  /**
   * Prompt createMany
   */
  export type PromptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prompts.
     */
    data: PromptCreateManyInput | PromptCreateManyInput[]
  }

  /**
   * Prompt createManyAndReturn
   */
  export type PromptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Prompts.
     */
    data: PromptCreateManyInput | PromptCreateManyInput[]
  }

  /**
   * Prompt update
   */
  export type PromptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * The data needed to update a Prompt.
     */
    data: XOR<PromptUpdateInput, PromptUncheckedUpdateInput>
    /**
     * Choose, which Prompt to update.
     */
    where: PromptWhereUniqueInput
  }

  /**
   * Prompt updateMany
   */
  export type PromptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prompts.
     */
    data: XOR<PromptUpdateManyMutationInput, PromptUncheckedUpdateManyInput>
    /**
     * Filter which Prompts to update
     */
    where?: PromptWhereInput
  }

  /**
   * Prompt upsert
   */
  export type PromptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * The filter to search for the Prompt to update in case it exists.
     */
    where: PromptWhereUniqueInput
    /**
     * In case the Prompt found by the `where` argument doesn't exist, create a new Prompt with this data.
     */
    create: XOR<PromptCreateInput, PromptUncheckedCreateInput>
    /**
     * In case the Prompt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromptUpdateInput, PromptUncheckedUpdateInput>
  }

  /**
   * Prompt delete
   */
  export type PromptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * Filter which Prompt to delete.
     */
    where: PromptWhereUniqueInput
  }

  /**
   * Prompt deleteMany
   */
  export type PromptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prompts to delete
     */
    where?: PromptWhereInput
  }

  /**
   * Prompt without action
   */
  export type PromptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    avatarUrl: 'avatarUrl',
    phone: 'phone',
    major: 'major',
    education: 'education',
    role: 'role',
    status: 'status',
    tokenVersion: 'tokenVersion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CareerAssessmentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    assessmentType: 'assessmentType',
    inputData: 'inputData',
    resultData: 'resultData',
    score: 'score',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CareerAssessmentScalarFieldEnum = (typeof CareerAssessmentScalarFieldEnum)[keyof typeof CareerAssessmentScalarFieldEnum]


  export const ResumeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fileName: 'fileName',
    fileUrl: 'fileUrl',
    parsedData: 'parsedData',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum]


  export const InterviewSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    jobTitle: 'jobTitle',
    level: 'level',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InterviewSessionScalarFieldEnum = (typeof InterviewSessionScalarFieldEnum)[keyof typeof InterviewSessionScalarFieldEnum]


  export const InterviewQuestionScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    question: 'question',
    answer: 'answer',
    evaluation: 'evaluation',
    nextQuestion: 'nextQuestion',
    createdAt: 'createdAt'
  };

  export type InterviewQuestionScalarFieldEnum = (typeof InterviewQuestionScalarFieldEnum)[keyof typeof InterviewQuestionScalarFieldEnum]


  export const LearningPlanScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    planData: 'planData',
    progress: 'progress',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LearningPlanScalarFieldEnum = (typeof LearningPlanScalarFieldEnum)[keyof typeof LearningPlanScalarFieldEnum]


  export const GrowthRecordScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    content: 'content',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type GrowthRecordScalarFieldEnum = (typeof GrowthRecordScalarFieldEnum)[keyof typeof GrowthRecordScalarFieldEnum]


  export const AiChatSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    chatType: 'chatType',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AiChatSessionScalarFieldEnum = (typeof AiChatSessionScalarFieldEnum)[keyof typeof AiChatSessionScalarFieldEnum]


  export const AiChatMessageScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    role: 'role',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type AiChatMessageScalarFieldEnum = (typeof AiChatMessageScalarFieldEnum)[keyof typeof AiChatMessageScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    content: 'content',
    isRead: 'isRead',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const PromptScalarFieldEnum: {
    id: 'id',
    key: 'key',
    name: 'name',
    category: 'category',
    template: 'template',
    variables: 'variables',
    version: 'version',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PromptScalarFieldEnum = (typeof PromptScalarFieldEnum)[keyof typeof PromptScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    major?: StringNullableFilter<"User"> | string | null
    education?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    tokenVersion?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    CareerAssessment?: CareerAssessmentListRelationFilter
    Resume?: ResumeListRelationFilter
    InterviewSession?: InterviewSessionListRelationFilter
    LearningPlan?: LearningPlanListRelationFilter
    GrowthRecord?: GrowthRecordListRelationFilter
    AiChatSession?: AiChatSessionListRelationFilter
    Notification?: NotificationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    major?: SortOrderInput | SortOrder
    education?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    CareerAssessment?: CareerAssessmentOrderByRelationAggregateInput
    Resume?: ResumeOrderByRelationAggregateInput
    InterviewSession?: InterviewSessionOrderByRelationAggregateInput
    LearningPlan?: LearningPlanOrderByRelationAggregateInput
    GrowthRecord?: GrowthRecordOrderByRelationAggregateInput
    AiChatSession?: AiChatSessionOrderByRelationAggregateInput
    Notification?: NotificationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    major?: StringNullableFilter<"User"> | string | null
    education?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    tokenVersion?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    CareerAssessment?: CareerAssessmentListRelationFilter
    Resume?: ResumeListRelationFilter
    InterviewSession?: InterviewSessionListRelationFilter
    LearningPlan?: LearningPlanListRelationFilter
    GrowthRecord?: GrowthRecordListRelationFilter
    AiChatSession?: AiChatSessionListRelationFilter
    Notification?: NotificationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    major?: SortOrderInput | SortOrder
    education?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    major?: StringNullableWithAggregatesFilter<"User"> | string | null
    education?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    status?: StringWithAggregatesFilter<"User"> | string
    tokenVersion?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CareerAssessmentWhereInput = {
    AND?: CareerAssessmentWhereInput | CareerAssessmentWhereInput[]
    OR?: CareerAssessmentWhereInput[]
    NOT?: CareerAssessmentWhereInput | CareerAssessmentWhereInput[]
    id?: IntFilter<"CareerAssessment"> | number
    userId?: IntFilter<"CareerAssessment"> | number
    assessmentType?: StringFilter<"CareerAssessment"> | string
    inputData?: StringFilter<"CareerAssessment"> | string
    resultData?: StringFilter<"CareerAssessment"> | string
    score?: IntNullableFilter<"CareerAssessment"> | number | null
    createdAt?: DateTimeFilter<"CareerAssessment"> | Date | string
    updatedAt?: DateTimeFilter<"CareerAssessment"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type CareerAssessmentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    assessmentType?: SortOrder
    inputData?: SortOrder
    resultData?: SortOrder
    score?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CareerAssessmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CareerAssessmentWhereInput | CareerAssessmentWhereInput[]
    OR?: CareerAssessmentWhereInput[]
    NOT?: CareerAssessmentWhereInput | CareerAssessmentWhereInput[]
    userId?: IntFilter<"CareerAssessment"> | number
    assessmentType?: StringFilter<"CareerAssessment"> | string
    inputData?: StringFilter<"CareerAssessment"> | string
    resultData?: StringFilter<"CareerAssessment"> | string
    score?: IntNullableFilter<"CareerAssessment"> | number | null
    createdAt?: DateTimeFilter<"CareerAssessment"> | Date | string
    updatedAt?: DateTimeFilter<"CareerAssessment"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type CareerAssessmentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    assessmentType?: SortOrder
    inputData?: SortOrder
    resultData?: SortOrder
    score?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CareerAssessmentCountOrderByAggregateInput
    _avg?: CareerAssessmentAvgOrderByAggregateInput
    _max?: CareerAssessmentMaxOrderByAggregateInput
    _min?: CareerAssessmentMinOrderByAggregateInput
    _sum?: CareerAssessmentSumOrderByAggregateInput
  }

  export type CareerAssessmentScalarWhereWithAggregatesInput = {
    AND?: CareerAssessmentScalarWhereWithAggregatesInput | CareerAssessmentScalarWhereWithAggregatesInput[]
    OR?: CareerAssessmentScalarWhereWithAggregatesInput[]
    NOT?: CareerAssessmentScalarWhereWithAggregatesInput | CareerAssessmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CareerAssessment"> | number
    userId?: IntWithAggregatesFilter<"CareerAssessment"> | number
    assessmentType?: StringWithAggregatesFilter<"CareerAssessment"> | string
    inputData?: StringWithAggregatesFilter<"CareerAssessment"> | string
    resultData?: StringWithAggregatesFilter<"CareerAssessment"> | string
    score?: IntNullableWithAggregatesFilter<"CareerAssessment"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"CareerAssessment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CareerAssessment"> | Date | string
  }

  export type ResumeWhereInput = {
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    id?: IntFilter<"Resume"> | number
    userId?: IntFilter<"Resume"> | number
    fileName?: StringFilter<"Resume"> | string
    fileUrl?: StringFilter<"Resume"> | string
    parsedData?: StringFilter<"Resume"> | string
    status?: StringFilter<"Resume"> | string
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ResumeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    parsedData?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    userId?: IntFilter<"Resume"> | number
    fileName?: StringFilter<"Resume"> | string
    fileUrl?: StringFilter<"Resume"> | string
    parsedData?: StringFilter<"Resume"> | string
    status?: StringFilter<"Resume"> | string
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ResumeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    parsedData?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ResumeCountOrderByAggregateInput
    _avg?: ResumeAvgOrderByAggregateInput
    _max?: ResumeMaxOrderByAggregateInput
    _min?: ResumeMinOrderByAggregateInput
    _sum?: ResumeSumOrderByAggregateInput
  }

  export type ResumeScalarWhereWithAggregatesInput = {
    AND?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    OR?: ResumeScalarWhereWithAggregatesInput[]
    NOT?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Resume"> | number
    userId?: IntWithAggregatesFilter<"Resume"> | number
    fileName?: StringWithAggregatesFilter<"Resume"> | string
    fileUrl?: StringWithAggregatesFilter<"Resume"> | string
    parsedData?: StringWithAggregatesFilter<"Resume"> | string
    status?: StringWithAggregatesFilter<"Resume"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
  }

  export type InterviewSessionWhereInput = {
    AND?: InterviewSessionWhereInput | InterviewSessionWhereInput[]
    OR?: InterviewSessionWhereInput[]
    NOT?: InterviewSessionWhereInput | InterviewSessionWhereInput[]
    id?: IntFilter<"InterviewSession"> | number
    userId?: IntFilter<"InterviewSession"> | number
    jobTitle?: StringFilter<"InterviewSession"> | string
    level?: StringFilter<"InterviewSession"> | string
    status?: StringFilter<"InterviewSession"> | string
    createdAt?: DateTimeFilter<"InterviewSession"> | Date | string
    updatedAt?: DateTimeFilter<"InterviewSession"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    InterviewQuestion?: InterviewQuestionListRelationFilter
  }

  export type InterviewSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    jobTitle?: SortOrder
    level?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    InterviewQuestion?: InterviewQuestionOrderByRelationAggregateInput
  }

  export type InterviewSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InterviewSessionWhereInput | InterviewSessionWhereInput[]
    OR?: InterviewSessionWhereInput[]
    NOT?: InterviewSessionWhereInput | InterviewSessionWhereInput[]
    userId?: IntFilter<"InterviewSession"> | number
    jobTitle?: StringFilter<"InterviewSession"> | string
    level?: StringFilter<"InterviewSession"> | string
    status?: StringFilter<"InterviewSession"> | string
    createdAt?: DateTimeFilter<"InterviewSession"> | Date | string
    updatedAt?: DateTimeFilter<"InterviewSession"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    InterviewQuestion?: InterviewQuestionListRelationFilter
  }, "id">

  export type InterviewSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    jobTitle?: SortOrder
    level?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InterviewSessionCountOrderByAggregateInput
    _avg?: InterviewSessionAvgOrderByAggregateInput
    _max?: InterviewSessionMaxOrderByAggregateInput
    _min?: InterviewSessionMinOrderByAggregateInput
    _sum?: InterviewSessionSumOrderByAggregateInput
  }

  export type InterviewSessionScalarWhereWithAggregatesInput = {
    AND?: InterviewSessionScalarWhereWithAggregatesInput | InterviewSessionScalarWhereWithAggregatesInput[]
    OR?: InterviewSessionScalarWhereWithAggregatesInput[]
    NOT?: InterviewSessionScalarWhereWithAggregatesInput | InterviewSessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InterviewSession"> | number
    userId?: IntWithAggregatesFilter<"InterviewSession"> | number
    jobTitle?: StringWithAggregatesFilter<"InterviewSession"> | string
    level?: StringWithAggregatesFilter<"InterviewSession"> | string
    status?: StringWithAggregatesFilter<"InterviewSession"> | string
    createdAt?: DateTimeWithAggregatesFilter<"InterviewSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InterviewSession"> | Date | string
  }

  export type InterviewQuestionWhereInput = {
    AND?: InterviewQuestionWhereInput | InterviewQuestionWhereInput[]
    OR?: InterviewQuestionWhereInput[]
    NOT?: InterviewQuestionWhereInput | InterviewQuestionWhereInput[]
    id?: IntFilter<"InterviewQuestion"> | number
    sessionId?: IntFilter<"InterviewQuestion"> | number
    question?: StringFilter<"InterviewQuestion"> | string
    answer?: StringNullableFilter<"InterviewQuestion"> | string | null
    evaluation?: StringNullableFilter<"InterviewQuestion"> | string | null
    nextQuestion?: StringNullableFilter<"InterviewQuestion"> | string | null
    createdAt?: DateTimeFilter<"InterviewQuestion"> | Date | string
    session?: XOR<InterviewSessionRelationFilter, InterviewSessionWhereInput>
  }

  export type InterviewQuestionOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    question?: SortOrder
    answer?: SortOrderInput | SortOrder
    evaluation?: SortOrderInput | SortOrder
    nextQuestion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: InterviewSessionOrderByWithRelationInput
  }

  export type InterviewQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InterviewQuestionWhereInput | InterviewQuestionWhereInput[]
    OR?: InterviewQuestionWhereInput[]
    NOT?: InterviewQuestionWhereInput | InterviewQuestionWhereInput[]
    sessionId?: IntFilter<"InterviewQuestion"> | number
    question?: StringFilter<"InterviewQuestion"> | string
    answer?: StringNullableFilter<"InterviewQuestion"> | string | null
    evaluation?: StringNullableFilter<"InterviewQuestion"> | string | null
    nextQuestion?: StringNullableFilter<"InterviewQuestion"> | string | null
    createdAt?: DateTimeFilter<"InterviewQuestion"> | Date | string
    session?: XOR<InterviewSessionRelationFilter, InterviewSessionWhereInput>
  }, "id">

  export type InterviewQuestionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    question?: SortOrder
    answer?: SortOrderInput | SortOrder
    evaluation?: SortOrderInput | SortOrder
    nextQuestion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: InterviewQuestionCountOrderByAggregateInput
    _avg?: InterviewQuestionAvgOrderByAggregateInput
    _max?: InterviewQuestionMaxOrderByAggregateInput
    _min?: InterviewQuestionMinOrderByAggregateInput
    _sum?: InterviewQuestionSumOrderByAggregateInput
  }

  export type InterviewQuestionScalarWhereWithAggregatesInput = {
    AND?: InterviewQuestionScalarWhereWithAggregatesInput | InterviewQuestionScalarWhereWithAggregatesInput[]
    OR?: InterviewQuestionScalarWhereWithAggregatesInput[]
    NOT?: InterviewQuestionScalarWhereWithAggregatesInput | InterviewQuestionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InterviewQuestion"> | number
    sessionId?: IntWithAggregatesFilter<"InterviewQuestion"> | number
    question?: StringWithAggregatesFilter<"InterviewQuestion"> | string
    answer?: StringNullableWithAggregatesFilter<"InterviewQuestion"> | string | null
    evaluation?: StringNullableWithAggregatesFilter<"InterviewQuestion"> | string | null
    nextQuestion?: StringNullableWithAggregatesFilter<"InterviewQuestion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"InterviewQuestion"> | Date | string
  }

  export type LearningPlanWhereInput = {
    AND?: LearningPlanWhereInput | LearningPlanWhereInput[]
    OR?: LearningPlanWhereInput[]
    NOT?: LearningPlanWhereInput | LearningPlanWhereInput[]
    id?: IntFilter<"LearningPlan"> | number
    userId?: IntFilter<"LearningPlan"> | number
    title?: StringFilter<"LearningPlan"> | string
    description?: StringNullableFilter<"LearningPlan"> | string | null
    planData?: StringFilter<"LearningPlan"> | string
    progress?: IntFilter<"LearningPlan"> | number
    status?: StringFilter<"LearningPlan"> | string
    createdAt?: DateTimeFilter<"LearningPlan"> | Date | string
    updatedAt?: DateTimeFilter<"LearningPlan"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type LearningPlanOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    planData?: SortOrder
    progress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LearningPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LearningPlanWhereInput | LearningPlanWhereInput[]
    OR?: LearningPlanWhereInput[]
    NOT?: LearningPlanWhereInput | LearningPlanWhereInput[]
    userId?: IntFilter<"LearningPlan"> | number
    title?: StringFilter<"LearningPlan"> | string
    description?: StringNullableFilter<"LearningPlan"> | string | null
    planData?: StringFilter<"LearningPlan"> | string
    progress?: IntFilter<"LearningPlan"> | number
    status?: StringFilter<"LearningPlan"> | string
    createdAt?: DateTimeFilter<"LearningPlan"> | Date | string
    updatedAt?: DateTimeFilter<"LearningPlan"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type LearningPlanOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    planData?: SortOrder
    progress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LearningPlanCountOrderByAggregateInput
    _avg?: LearningPlanAvgOrderByAggregateInput
    _max?: LearningPlanMaxOrderByAggregateInput
    _min?: LearningPlanMinOrderByAggregateInput
    _sum?: LearningPlanSumOrderByAggregateInput
  }

  export type LearningPlanScalarWhereWithAggregatesInput = {
    AND?: LearningPlanScalarWhereWithAggregatesInput | LearningPlanScalarWhereWithAggregatesInput[]
    OR?: LearningPlanScalarWhereWithAggregatesInput[]
    NOT?: LearningPlanScalarWhereWithAggregatesInput | LearningPlanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LearningPlan"> | number
    userId?: IntWithAggregatesFilter<"LearningPlan"> | number
    title?: StringWithAggregatesFilter<"LearningPlan"> | string
    description?: StringNullableWithAggregatesFilter<"LearningPlan"> | string | null
    planData?: StringWithAggregatesFilter<"LearningPlan"> | string
    progress?: IntWithAggregatesFilter<"LearningPlan"> | number
    status?: StringWithAggregatesFilter<"LearningPlan"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LearningPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LearningPlan"> | Date | string
  }

  export type GrowthRecordWhereInput = {
    AND?: GrowthRecordWhereInput | GrowthRecordWhereInput[]
    OR?: GrowthRecordWhereInput[]
    NOT?: GrowthRecordWhereInput | GrowthRecordWhereInput[]
    id?: IntFilter<"GrowthRecord"> | number
    userId?: IntFilter<"GrowthRecord"> | number
    type?: StringFilter<"GrowthRecord"> | string
    content?: StringFilter<"GrowthRecord"> | string
    metadata?: StringNullableFilter<"GrowthRecord"> | string | null
    createdAt?: DateTimeFilter<"GrowthRecord"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type GrowthRecordOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type GrowthRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GrowthRecordWhereInput | GrowthRecordWhereInput[]
    OR?: GrowthRecordWhereInput[]
    NOT?: GrowthRecordWhereInput | GrowthRecordWhereInput[]
    userId?: IntFilter<"GrowthRecord"> | number
    type?: StringFilter<"GrowthRecord"> | string
    content?: StringFilter<"GrowthRecord"> | string
    metadata?: StringNullableFilter<"GrowthRecord"> | string | null
    createdAt?: DateTimeFilter<"GrowthRecord"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type GrowthRecordOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: GrowthRecordCountOrderByAggregateInput
    _avg?: GrowthRecordAvgOrderByAggregateInput
    _max?: GrowthRecordMaxOrderByAggregateInput
    _min?: GrowthRecordMinOrderByAggregateInput
    _sum?: GrowthRecordSumOrderByAggregateInput
  }

  export type GrowthRecordScalarWhereWithAggregatesInput = {
    AND?: GrowthRecordScalarWhereWithAggregatesInput | GrowthRecordScalarWhereWithAggregatesInput[]
    OR?: GrowthRecordScalarWhereWithAggregatesInput[]
    NOT?: GrowthRecordScalarWhereWithAggregatesInput | GrowthRecordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GrowthRecord"> | number
    userId?: IntWithAggregatesFilter<"GrowthRecord"> | number
    type?: StringWithAggregatesFilter<"GrowthRecord"> | string
    content?: StringWithAggregatesFilter<"GrowthRecord"> | string
    metadata?: StringNullableWithAggregatesFilter<"GrowthRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GrowthRecord"> | Date | string
  }

  export type AiChatSessionWhereInput = {
    AND?: AiChatSessionWhereInput | AiChatSessionWhereInput[]
    OR?: AiChatSessionWhereInput[]
    NOT?: AiChatSessionWhereInput | AiChatSessionWhereInput[]
    id?: IntFilter<"AiChatSession"> | number
    userId?: IntFilter<"AiChatSession"> | number
    chatType?: StringFilter<"AiChatSession"> | string
    status?: StringFilter<"AiChatSession"> | string
    createdAt?: DateTimeFilter<"AiChatSession"> | Date | string
    updatedAt?: DateTimeFilter<"AiChatSession"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    AiChatMessage?: AiChatMessageListRelationFilter
  }

  export type AiChatSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    chatType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    AiChatMessage?: AiChatMessageOrderByRelationAggregateInput
  }

  export type AiChatSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AiChatSessionWhereInput | AiChatSessionWhereInput[]
    OR?: AiChatSessionWhereInput[]
    NOT?: AiChatSessionWhereInput | AiChatSessionWhereInput[]
    userId?: IntFilter<"AiChatSession"> | number
    chatType?: StringFilter<"AiChatSession"> | string
    status?: StringFilter<"AiChatSession"> | string
    createdAt?: DateTimeFilter<"AiChatSession"> | Date | string
    updatedAt?: DateTimeFilter<"AiChatSession"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    AiChatMessage?: AiChatMessageListRelationFilter
  }, "id">

  export type AiChatSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    chatType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AiChatSessionCountOrderByAggregateInput
    _avg?: AiChatSessionAvgOrderByAggregateInput
    _max?: AiChatSessionMaxOrderByAggregateInput
    _min?: AiChatSessionMinOrderByAggregateInput
    _sum?: AiChatSessionSumOrderByAggregateInput
  }

  export type AiChatSessionScalarWhereWithAggregatesInput = {
    AND?: AiChatSessionScalarWhereWithAggregatesInput | AiChatSessionScalarWhereWithAggregatesInput[]
    OR?: AiChatSessionScalarWhereWithAggregatesInput[]
    NOT?: AiChatSessionScalarWhereWithAggregatesInput | AiChatSessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AiChatSession"> | number
    userId?: IntWithAggregatesFilter<"AiChatSession"> | number
    chatType?: StringWithAggregatesFilter<"AiChatSession"> | string
    status?: StringWithAggregatesFilter<"AiChatSession"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AiChatSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AiChatSession"> | Date | string
  }

  export type AiChatMessageWhereInput = {
    AND?: AiChatMessageWhereInput | AiChatMessageWhereInput[]
    OR?: AiChatMessageWhereInput[]
    NOT?: AiChatMessageWhereInput | AiChatMessageWhereInput[]
    id?: IntFilter<"AiChatMessage"> | number
    sessionId?: IntFilter<"AiChatMessage"> | number
    role?: StringFilter<"AiChatMessage"> | string
    content?: StringFilter<"AiChatMessage"> | string
    createdAt?: DateTimeFilter<"AiChatMessage"> | Date | string
    session?: XOR<AiChatSessionRelationFilter, AiChatSessionWhereInput>
  }

  export type AiChatMessageOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    session?: AiChatSessionOrderByWithRelationInput
  }

  export type AiChatMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AiChatMessageWhereInput | AiChatMessageWhereInput[]
    OR?: AiChatMessageWhereInput[]
    NOT?: AiChatMessageWhereInput | AiChatMessageWhereInput[]
    sessionId?: IntFilter<"AiChatMessage"> | number
    role?: StringFilter<"AiChatMessage"> | string
    content?: StringFilter<"AiChatMessage"> | string
    createdAt?: DateTimeFilter<"AiChatMessage"> | Date | string
    session?: XOR<AiChatSessionRelationFilter, AiChatSessionWhereInput>
  }, "id">

  export type AiChatMessageOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: AiChatMessageCountOrderByAggregateInput
    _avg?: AiChatMessageAvgOrderByAggregateInput
    _max?: AiChatMessageMaxOrderByAggregateInput
    _min?: AiChatMessageMinOrderByAggregateInput
    _sum?: AiChatMessageSumOrderByAggregateInput
  }

  export type AiChatMessageScalarWhereWithAggregatesInput = {
    AND?: AiChatMessageScalarWhereWithAggregatesInput | AiChatMessageScalarWhereWithAggregatesInput[]
    OR?: AiChatMessageScalarWhereWithAggregatesInput[]
    NOT?: AiChatMessageScalarWhereWithAggregatesInput | AiChatMessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AiChatMessage"> | number
    sessionId?: IntWithAggregatesFilter<"AiChatMessage"> | number
    role?: StringWithAggregatesFilter<"AiChatMessage"> | string
    content?: StringWithAggregatesFilter<"AiChatMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AiChatMessage"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: IntFilter<"Notification"> | number
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    content?: StringFilter<"Notification"> | string
    isRead?: IntFilter<"Notification"> | number
    metadata?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: IntFilter<"Notification"> | number
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    content?: StringFilter<"Notification"> | string
    isRead?: IntFilter<"Notification"> | number
    metadata?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notification"> | number
    userId?: IntWithAggregatesFilter<"Notification"> | number
    type?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    content?: StringWithAggregatesFilter<"Notification"> | string
    isRead?: IntWithAggregatesFilter<"Notification"> | number
    metadata?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type PromptWhereInput = {
    AND?: PromptWhereInput | PromptWhereInput[]
    OR?: PromptWhereInput[]
    NOT?: PromptWhereInput | PromptWhereInput[]
    id?: IntFilter<"Prompt"> | number
    key?: StringFilter<"Prompt"> | string
    name?: StringFilter<"Prompt"> | string
    category?: StringFilter<"Prompt"> | string
    template?: StringFilter<"Prompt"> | string
    variables?: StringFilter<"Prompt"> | string
    version?: StringFilter<"Prompt"> | string
    isActive?: IntFilter<"Prompt"> | number
    createdAt?: DateTimeFilter<"Prompt"> | Date | string
    updatedAt?: DateTimeFilter<"Prompt"> | Date | string
  }

  export type PromptOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    category?: SortOrder
    template?: SortOrder
    variables?: SortOrder
    version?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromptWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    key?: string
    AND?: PromptWhereInput | PromptWhereInput[]
    OR?: PromptWhereInput[]
    NOT?: PromptWhereInput | PromptWhereInput[]
    name?: StringFilter<"Prompt"> | string
    category?: StringFilter<"Prompt"> | string
    template?: StringFilter<"Prompt"> | string
    variables?: StringFilter<"Prompt"> | string
    version?: StringFilter<"Prompt"> | string
    isActive?: IntFilter<"Prompt"> | number
    createdAt?: DateTimeFilter<"Prompt"> | Date | string
    updatedAt?: DateTimeFilter<"Prompt"> | Date | string
  }, "id" | "key">

  export type PromptOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    category?: SortOrder
    template?: SortOrder
    variables?: SortOrder
    version?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PromptCountOrderByAggregateInput
    _avg?: PromptAvgOrderByAggregateInput
    _max?: PromptMaxOrderByAggregateInput
    _min?: PromptMinOrderByAggregateInput
    _sum?: PromptSumOrderByAggregateInput
  }

  export type PromptScalarWhereWithAggregatesInput = {
    AND?: PromptScalarWhereWithAggregatesInput | PromptScalarWhereWithAggregatesInput[]
    OR?: PromptScalarWhereWithAggregatesInput[]
    NOT?: PromptScalarWhereWithAggregatesInput | PromptScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Prompt"> | number
    key?: StringWithAggregatesFilter<"Prompt"> | string
    name?: StringWithAggregatesFilter<"Prompt"> | string
    category?: StringWithAggregatesFilter<"Prompt"> | string
    template?: StringWithAggregatesFilter<"Prompt"> | string
    variables?: StringWithAggregatesFilter<"Prompt"> | string
    version?: StringWithAggregatesFilter<"Prompt"> | string
    isActive?: IntWithAggregatesFilter<"Prompt"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Prompt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Prompt"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentCreateNestedManyWithoutUserInput
    Resume?: ResumeCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionCreateNestedManyWithoutUserInput
    Notification?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentUncheckedCreateNestedManyWithoutUserInput
    Resume?: ResumeUncheckedCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanUncheckedCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordUncheckedCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionUncheckedCreateNestedManyWithoutUserInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUpdateManyWithoutUserNestedInput
    Resume?: ResumeUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUpdateManyWithoutUserNestedInput
    Notification?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUncheckedUpdateManyWithoutUserNestedInput
    Resume?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUncheckedUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUncheckedUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUncheckedUpdateManyWithoutUserNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerAssessmentCreateInput = {
    assessmentType: string
    inputData: string
    resultData: string
    score?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCareerAssessmentInput
  }

  export type CareerAssessmentUncheckedCreateInput = {
    id?: number
    userId: number
    assessmentType: string
    inputData: string
    resultData: string
    score?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareerAssessmentUpdateInput = {
    assessmentType?: StringFieldUpdateOperationsInput | string
    inputData?: StringFieldUpdateOperationsInput | string
    resultData?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCareerAssessmentNestedInput
  }

  export type CareerAssessmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assessmentType?: StringFieldUpdateOperationsInput | string
    inputData?: StringFieldUpdateOperationsInput | string
    resultData?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerAssessmentCreateManyInput = {
    id?: number
    userId: number
    assessmentType: string
    inputData: string
    resultData: string
    score?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareerAssessmentUpdateManyMutationInput = {
    assessmentType?: StringFieldUpdateOperationsInput | string
    inputData?: StringFieldUpdateOperationsInput | string
    resultData?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerAssessmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assessmentType?: StringFieldUpdateOperationsInput | string
    inputData?: StringFieldUpdateOperationsInput | string
    resultData?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeCreateInput = {
    fileName: string
    fileUrl: string
    parsedData: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutResumeInput
  }

  export type ResumeUncheckedCreateInput = {
    id?: number
    userId: number
    fileName: string
    fileUrl: string
    parsedData: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeUpdateInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    parsedData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    parsedData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeCreateManyInput = {
    id?: number
    userId: number
    fileName: string
    fileUrl: string
    parsedData: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeUpdateManyMutationInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    parsedData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    parsedData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewSessionCreateInput = {
    jobTitle: string
    level: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInterviewSessionInput
    InterviewQuestion?: InterviewQuestionCreateNestedManyWithoutSessionInput
  }

  export type InterviewSessionUncheckedCreateInput = {
    id?: number
    userId: number
    jobTitle: string
    level: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    InterviewQuestion?: InterviewQuestionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type InterviewSessionUpdateInput = {
    jobTitle?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInterviewSessionNestedInput
    InterviewQuestion?: InterviewQuestionUpdateManyWithoutSessionNestedInput
  }

  export type InterviewSessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    jobTitle?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    InterviewQuestion?: InterviewQuestionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type InterviewSessionCreateManyInput = {
    id?: number
    userId: number
    jobTitle: string
    level: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewSessionUpdateManyMutationInput = {
    jobTitle?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewSessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    jobTitle?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewQuestionCreateInput = {
    question: string
    answer?: string | null
    evaluation?: string | null
    nextQuestion?: string | null
    createdAt?: Date | string
    session: InterviewSessionCreateNestedOneWithoutInterviewQuestionInput
  }

  export type InterviewQuestionUncheckedCreateInput = {
    id?: number
    sessionId: number
    question: string
    answer?: string | null
    evaluation?: string | null
    nextQuestion?: string | null
    createdAt?: Date | string
  }

  export type InterviewQuestionUpdateInput = {
    question?: StringFieldUpdateOperationsInput | string
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation?: NullableStringFieldUpdateOperationsInput | string | null
    nextQuestion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: InterviewSessionUpdateOneRequiredWithoutInterviewQuestionNestedInput
  }

  export type InterviewQuestionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation?: NullableStringFieldUpdateOperationsInput | string | null
    nextQuestion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewQuestionCreateManyInput = {
    id?: number
    sessionId: number
    question: string
    answer?: string | null
    evaluation?: string | null
    nextQuestion?: string | null
    createdAt?: Date | string
  }

  export type InterviewQuestionUpdateManyMutationInput = {
    question?: StringFieldUpdateOperationsInput | string
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation?: NullableStringFieldUpdateOperationsInput | string | null
    nextQuestion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewQuestionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation?: NullableStringFieldUpdateOperationsInput | string | null
    nextQuestion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPlanCreateInput = {
    title: string
    description?: string | null
    planData: string
    progress?: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutLearningPlanInput
  }

  export type LearningPlanUncheckedCreateInput = {
    id?: number
    userId: number
    title: string
    description?: string | null
    planData: string
    progress?: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningPlanUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    planData?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLearningPlanNestedInput
  }

  export type LearningPlanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    planData?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPlanCreateManyInput = {
    id?: number
    userId: number
    title: string
    description?: string | null
    planData: string
    progress?: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningPlanUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    planData?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPlanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    planData?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrowthRecordCreateInput = {
    type: string
    content: string
    metadata?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutGrowthRecordInput
  }

  export type GrowthRecordUncheckedCreateInput = {
    id?: number
    userId: number
    type: string
    content: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type GrowthRecordUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGrowthRecordNestedInput
  }

  export type GrowthRecordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrowthRecordCreateManyInput = {
    id?: number
    userId: number
    type: string
    content: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type GrowthRecordUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrowthRecordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatSessionCreateInput = {
    chatType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAiChatSessionInput
    AiChatMessage?: AiChatMessageCreateNestedManyWithoutSessionInput
  }

  export type AiChatSessionUncheckedCreateInput = {
    id?: number
    userId: number
    chatType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    AiChatMessage?: AiChatMessageUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AiChatSessionUpdateInput = {
    chatType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAiChatSessionNestedInput
    AiChatMessage?: AiChatMessageUpdateManyWithoutSessionNestedInput
  }

  export type AiChatSessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    chatType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AiChatMessage?: AiChatMessageUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type AiChatSessionCreateManyInput = {
    id?: number
    userId: number
    chatType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiChatSessionUpdateManyMutationInput = {
    chatType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatSessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    chatType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatMessageCreateInput = {
    role: string
    content: string
    createdAt?: Date | string
    session: AiChatSessionCreateNestedOneWithoutAiChatMessageInput
  }

  export type AiChatMessageUncheckedCreateInput = {
    id?: number
    sessionId: number
    role: string
    content: string
    createdAt?: Date | string
  }

  export type AiChatMessageUpdateInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: AiChatSessionUpdateOneRequiredWithoutAiChatMessageNestedInput
  }

  export type AiChatMessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatMessageCreateManyInput = {
    id?: number
    sessionId: number
    role: string
    content: string
    createdAt?: Date | string
  }

  export type AiChatMessageUpdateManyMutationInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatMessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    type: string
    title: string
    content: string
    isRead?: number
    metadata?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    userId: number
    type: string
    title: string
    content: string
    isRead?: number
    metadata?: string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: number
    userId: number
    type: string
    title: string
    content: string
    isRead?: number
    metadata?: string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromptCreateInput = {
    key: string
    name: string
    category: string
    template: string
    variables: string
    version?: string
    isActive?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PromptUncheckedCreateInput = {
    id?: number
    key: string
    name: string
    category: string
    template: string
    variables: string
    version?: string
    isActive?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PromptUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    variables?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromptUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    variables?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromptCreateManyInput = {
    id?: number
    key: string
    name: string
    category: string
    template: string
    variables: string
    version?: string
    isActive?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PromptUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    variables?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromptUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    variables?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CareerAssessmentListRelationFilter = {
    every?: CareerAssessmentWhereInput
    some?: CareerAssessmentWhereInput
    none?: CareerAssessmentWhereInput
  }

  export type ResumeListRelationFilter = {
    every?: ResumeWhereInput
    some?: ResumeWhereInput
    none?: ResumeWhereInput
  }

  export type InterviewSessionListRelationFilter = {
    every?: InterviewSessionWhereInput
    some?: InterviewSessionWhereInput
    none?: InterviewSessionWhereInput
  }

  export type LearningPlanListRelationFilter = {
    every?: LearningPlanWhereInput
    some?: LearningPlanWhereInput
    none?: LearningPlanWhereInput
  }

  export type GrowthRecordListRelationFilter = {
    every?: GrowthRecordWhereInput
    some?: GrowthRecordWhereInput
    none?: GrowthRecordWhereInput
  }

  export type AiChatSessionListRelationFilter = {
    every?: AiChatSessionWhereInput
    some?: AiChatSessionWhereInput
    none?: AiChatSessionWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CareerAssessmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InterviewSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LearningPlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GrowthRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AiChatSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    phone?: SortOrder
    major?: SortOrder
    education?: SortOrder
    role?: SortOrder
    status?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    tokenVersion?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    phone?: SortOrder
    major?: SortOrder
    education?: SortOrder
    role?: SortOrder
    status?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    phone?: SortOrder
    major?: SortOrder
    education?: SortOrder
    role?: SortOrder
    status?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    tokenVersion?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CareerAssessmentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    assessmentType?: SortOrder
    inputData?: SortOrder
    resultData?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerAssessmentAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    score?: SortOrder
  }

  export type CareerAssessmentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    assessmentType?: SortOrder
    inputData?: SortOrder
    resultData?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerAssessmentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    assessmentType?: SortOrder
    inputData?: SortOrder
    resultData?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerAssessmentSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    score?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ResumeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    parsedData?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    parsedData?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    parsedData?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type InterviewQuestionListRelationFilter = {
    every?: InterviewQuestionWhereInput
    some?: InterviewQuestionWhereInput
    none?: InterviewQuestionWhereInput
  }

  export type InterviewQuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InterviewSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobTitle?: SortOrder
    level?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InterviewSessionAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type InterviewSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobTitle?: SortOrder
    level?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InterviewSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobTitle?: SortOrder
    level?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InterviewSessionSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type InterviewSessionRelationFilter = {
    is?: InterviewSessionWhereInput
    isNot?: InterviewSessionWhereInput
  }

  export type InterviewQuestionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    evaluation?: SortOrder
    nextQuestion?: SortOrder
    createdAt?: SortOrder
  }

  export type InterviewQuestionAvgOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
  }

  export type InterviewQuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    evaluation?: SortOrder
    nextQuestion?: SortOrder
    createdAt?: SortOrder
  }

  export type InterviewQuestionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    evaluation?: SortOrder
    nextQuestion?: SortOrder
    createdAt?: SortOrder
  }

  export type InterviewQuestionSumOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
  }

  export type LearningPlanCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    planData?: SortOrder
    progress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningPlanAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    progress?: SortOrder
  }

  export type LearningPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    planData?: SortOrder
    progress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningPlanMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    planData?: SortOrder
    progress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningPlanSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    progress?: SortOrder
  }

  export type GrowthRecordCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type GrowthRecordAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type GrowthRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type GrowthRecordMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type GrowthRecordSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type AiChatMessageListRelationFilter = {
    every?: AiChatMessageWhereInput
    some?: AiChatMessageWhereInput
    none?: AiChatMessageWhereInput
  }

  export type AiChatMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AiChatSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chatType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiChatSessionAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type AiChatSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chatType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiChatSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chatType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiChatSessionSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type AiChatSessionRelationFilter = {
    is?: AiChatSessionWhereInput
    isNot?: AiChatSessionWhereInput
  }

  export type AiChatMessageCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type AiChatMessageAvgOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
  }

  export type AiChatMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type AiChatMessageMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type AiChatMessageSumOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    isRead?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    isRead?: SortOrder
  }

  export type PromptCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    category?: SortOrder
    template?: SortOrder
    variables?: SortOrder
    version?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromptAvgOrderByAggregateInput = {
    id?: SortOrder
    isActive?: SortOrder
  }

  export type PromptMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    category?: SortOrder
    template?: SortOrder
    variables?: SortOrder
    version?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromptMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    category?: SortOrder
    template?: SortOrder
    variables?: SortOrder
    version?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromptSumOrderByAggregateInput = {
    id?: SortOrder
    isActive?: SortOrder
  }

  export type CareerAssessmentCreateNestedManyWithoutUserInput = {
    create?: XOR<CareerAssessmentCreateWithoutUserInput, CareerAssessmentUncheckedCreateWithoutUserInput> | CareerAssessmentCreateWithoutUserInput[] | CareerAssessmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CareerAssessmentCreateOrConnectWithoutUserInput | CareerAssessmentCreateOrConnectWithoutUserInput[]
    createMany?: CareerAssessmentCreateManyUserInputEnvelope
    connect?: CareerAssessmentWhereUniqueInput | CareerAssessmentWhereUniqueInput[]
  }

  export type ResumeCreateNestedManyWithoutUserInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type InterviewSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<InterviewSessionCreateWithoutUserInput, InterviewSessionUncheckedCreateWithoutUserInput> | InterviewSessionCreateWithoutUserInput[] | InterviewSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewSessionCreateOrConnectWithoutUserInput | InterviewSessionCreateOrConnectWithoutUserInput[]
    createMany?: InterviewSessionCreateManyUserInputEnvelope
    connect?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
  }

  export type LearningPlanCreateNestedManyWithoutUserInput = {
    create?: XOR<LearningPlanCreateWithoutUserInput, LearningPlanUncheckedCreateWithoutUserInput> | LearningPlanCreateWithoutUserInput[] | LearningPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningPlanCreateOrConnectWithoutUserInput | LearningPlanCreateOrConnectWithoutUserInput[]
    createMany?: LearningPlanCreateManyUserInputEnvelope
    connect?: LearningPlanWhereUniqueInput | LearningPlanWhereUniqueInput[]
  }

  export type GrowthRecordCreateNestedManyWithoutUserInput = {
    create?: XOR<GrowthRecordCreateWithoutUserInput, GrowthRecordUncheckedCreateWithoutUserInput> | GrowthRecordCreateWithoutUserInput[] | GrowthRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GrowthRecordCreateOrConnectWithoutUserInput | GrowthRecordCreateOrConnectWithoutUserInput[]
    createMany?: GrowthRecordCreateManyUserInputEnvelope
    connect?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
  }

  export type AiChatSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<AiChatSessionCreateWithoutUserInput, AiChatSessionUncheckedCreateWithoutUserInput> | AiChatSessionCreateWithoutUserInput[] | AiChatSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiChatSessionCreateOrConnectWithoutUserInput | AiChatSessionCreateOrConnectWithoutUserInput[]
    createMany?: AiChatSessionCreateManyUserInputEnvelope
    connect?: AiChatSessionWhereUniqueInput | AiChatSessionWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type CareerAssessmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CareerAssessmentCreateWithoutUserInput, CareerAssessmentUncheckedCreateWithoutUserInput> | CareerAssessmentCreateWithoutUserInput[] | CareerAssessmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CareerAssessmentCreateOrConnectWithoutUserInput | CareerAssessmentCreateOrConnectWithoutUserInput[]
    createMany?: CareerAssessmentCreateManyUserInputEnvelope
    connect?: CareerAssessmentWhereUniqueInput | CareerAssessmentWhereUniqueInput[]
  }

  export type ResumeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type InterviewSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InterviewSessionCreateWithoutUserInput, InterviewSessionUncheckedCreateWithoutUserInput> | InterviewSessionCreateWithoutUserInput[] | InterviewSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewSessionCreateOrConnectWithoutUserInput | InterviewSessionCreateOrConnectWithoutUserInput[]
    createMany?: InterviewSessionCreateManyUserInputEnvelope
    connect?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
  }

  export type LearningPlanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LearningPlanCreateWithoutUserInput, LearningPlanUncheckedCreateWithoutUserInput> | LearningPlanCreateWithoutUserInput[] | LearningPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningPlanCreateOrConnectWithoutUserInput | LearningPlanCreateOrConnectWithoutUserInput[]
    createMany?: LearningPlanCreateManyUserInputEnvelope
    connect?: LearningPlanWhereUniqueInput | LearningPlanWhereUniqueInput[]
  }

  export type GrowthRecordUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GrowthRecordCreateWithoutUserInput, GrowthRecordUncheckedCreateWithoutUserInput> | GrowthRecordCreateWithoutUserInput[] | GrowthRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GrowthRecordCreateOrConnectWithoutUserInput | GrowthRecordCreateOrConnectWithoutUserInput[]
    createMany?: GrowthRecordCreateManyUserInputEnvelope
    connect?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
  }

  export type AiChatSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AiChatSessionCreateWithoutUserInput, AiChatSessionUncheckedCreateWithoutUserInput> | AiChatSessionCreateWithoutUserInput[] | AiChatSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiChatSessionCreateOrConnectWithoutUserInput | AiChatSessionCreateOrConnectWithoutUserInput[]
    createMany?: AiChatSessionCreateManyUserInputEnvelope
    connect?: AiChatSessionWhereUniqueInput | AiChatSessionWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CareerAssessmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CareerAssessmentCreateWithoutUserInput, CareerAssessmentUncheckedCreateWithoutUserInput> | CareerAssessmentCreateWithoutUserInput[] | CareerAssessmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CareerAssessmentCreateOrConnectWithoutUserInput | CareerAssessmentCreateOrConnectWithoutUserInput[]
    upsert?: CareerAssessmentUpsertWithWhereUniqueWithoutUserInput | CareerAssessmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CareerAssessmentCreateManyUserInputEnvelope
    set?: CareerAssessmentWhereUniqueInput | CareerAssessmentWhereUniqueInput[]
    disconnect?: CareerAssessmentWhereUniqueInput | CareerAssessmentWhereUniqueInput[]
    delete?: CareerAssessmentWhereUniqueInput | CareerAssessmentWhereUniqueInput[]
    connect?: CareerAssessmentWhereUniqueInput | CareerAssessmentWhereUniqueInput[]
    update?: CareerAssessmentUpdateWithWhereUniqueWithoutUserInput | CareerAssessmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CareerAssessmentUpdateManyWithWhereWithoutUserInput | CareerAssessmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CareerAssessmentScalarWhereInput | CareerAssessmentScalarWhereInput[]
  }

  export type ResumeUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutUserInput | ResumeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutUserInput | ResumeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutUserInput | ResumeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type InterviewSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<InterviewSessionCreateWithoutUserInput, InterviewSessionUncheckedCreateWithoutUserInput> | InterviewSessionCreateWithoutUserInput[] | InterviewSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewSessionCreateOrConnectWithoutUserInput | InterviewSessionCreateOrConnectWithoutUserInput[]
    upsert?: InterviewSessionUpsertWithWhereUniqueWithoutUserInput | InterviewSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InterviewSessionCreateManyUserInputEnvelope
    set?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    disconnect?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    delete?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    connect?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    update?: InterviewSessionUpdateWithWhereUniqueWithoutUserInput | InterviewSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InterviewSessionUpdateManyWithWhereWithoutUserInput | InterviewSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InterviewSessionScalarWhereInput | InterviewSessionScalarWhereInput[]
  }

  export type LearningPlanUpdateManyWithoutUserNestedInput = {
    create?: XOR<LearningPlanCreateWithoutUserInput, LearningPlanUncheckedCreateWithoutUserInput> | LearningPlanCreateWithoutUserInput[] | LearningPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningPlanCreateOrConnectWithoutUserInput | LearningPlanCreateOrConnectWithoutUserInput[]
    upsert?: LearningPlanUpsertWithWhereUniqueWithoutUserInput | LearningPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LearningPlanCreateManyUserInputEnvelope
    set?: LearningPlanWhereUniqueInput | LearningPlanWhereUniqueInput[]
    disconnect?: LearningPlanWhereUniqueInput | LearningPlanWhereUniqueInput[]
    delete?: LearningPlanWhereUniqueInput | LearningPlanWhereUniqueInput[]
    connect?: LearningPlanWhereUniqueInput | LearningPlanWhereUniqueInput[]
    update?: LearningPlanUpdateWithWhereUniqueWithoutUserInput | LearningPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LearningPlanUpdateManyWithWhereWithoutUserInput | LearningPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LearningPlanScalarWhereInput | LearningPlanScalarWhereInput[]
  }

  export type GrowthRecordUpdateManyWithoutUserNestedInput = {
    create?: XOR<GrowthRecordCreateWithoutUserInput, GrowthRecordUncheckedCreateWithoutUserInput> | GrowthRecordCreateWithoutUserInput[] | GrowthRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GrowthRecordCreateOrConnectWithoutUserInput | GrowthRecordCreateOrConnectWithoutUserInput[]
    upsert?: GrowthRecordUpsertWithWhereUniqueWithoutUserInput | GrowthRecordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GrowthRecordCreateManyUserInputEnvelope
    set?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    disconnect?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    delete?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    connect?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    update?: GrowthRecordUpdateWithWhereUniqueWithoutUserInput | GrowthRecordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GrowthRecordUpdateManyWithWhereWithoutUserInput | GrowthRecordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GrowthRecordScalarWhereInput | GrowthRecordScalarWhereInput[]
  }

  export type AiChatSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<AiChatSessionCreateWithoutUserInput, AiChatSessionUncheckedCreateWithoutUserInput> | AiChatSessionCreateWithoutUserInput[] | AiChatSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiChatSessionCreateOrConnectWithoutUserInput | AiChatSessionCreateOrConnectWithoutUserInput[]
    upsert?: AiChatSessionUpsertWithWhereUniqueWithoutUserInput | AiChatSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AiChatSessionCreateManyUserInputEnvelope
    set?: AiChatSessionWhereUniqueInput | AiChatSessionWhereUniqueInput[]
    disconnect?: AiChatSessionWhereUniqueInput | AiChatSessionWhereUniqueInput[]
    delete?: AiChatSessionWhereUniqueInput | AiChatSessionWhereUniqueInput[]
    connect?: AiChatSessionWhereUniqueInput | AiChatSessionWhereUniqueInput[]
    update?: AiChatSessionUpdateWithWhereUniqueWithoutUserInput | AiChatSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AiChatSessionUpdateManyWithWhereWithoutUserInput | AiChatSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AiChatSessionScalarWhereInput | AiChatSessionScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type CareerAssessmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CareerAssessmentCreateWithoutUserInput, CareerAssessmentUncheckedCreateWithoutUserInput> | CareerAssessmentCreateWithoutUserInput[] | CareerAssessmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CareerAssessmentCreateOrConnectWithoutUserInput | CareerAssessmentCreateOrConnectWithoutUserInput[]
    upsert?: CareerAssessmentUpsertWithWhereUniqueWithoutUserInput | CareerAssessmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CareerAssessmentCreateManyUserInputEnvelope
    set?: CareerAssessmentWhereUniqueInput | CareerAssessmentWhereUniqueInput[]
    disconnect?: CareerAssessmentWhereUniqueInput | CareerAssessmentWhereUniqueInput[]
    delete?: CareerAssessmentWhereUniqueInput | CareerAssessmentWhereUniqueInput[]
    connect?: CareerAssessmentWhereUniqueInput | CareerAssessmentWhereUniqueInput[]
    update?: CareerAssessmentUpdateWithWhereUniqueWithoutUserInput | CareerAssessmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CareerAssessmentUpdateManyWithWhereWithoutUserInput | CareerAssessmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CareerAssessmentScalarWhereInput | CareerAssessmentScalarWhereInput[]
  }

  export type ResumeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutUserInput | ResumeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutUserInput | ResumeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutUserInput | ResumeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type InterviewSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InterviewSessionCreateWithoutUserInput, InterviewSessionUncheckedCreateWithoutUserInput> | InterviewSessionCreateWithoutUserInput[] | InterviewSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewSessionCreateOrConnectWithoutUserInput | InterviewSessionCreateOrConnectWithoutUserInput[]
    upsert?: InterviewSessionUpsertWithWhereUniqueWithoutUserInput | InterviewSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InterviewSessionCreateManyUserInputEnvelope
    set?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    disconnect?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    delete?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    connect?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    update?: InterviewSessionUpdateWithWhereUniqueWithoutUserInput | InterviewSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InterviewSessionUpdateManyWithWhereWithoutUserInput | InterviewSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InterviewSessionScalarWhereInput | InterviewSessionScalarWhereInput[]
  }

  export type LearningPlanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LearningPlanCreateWithoutUserInput, LearningPlanUncheckedCreateWithoutUserInput> | LearningPlanCreateWithoutUserInput[] | LearningPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningPlanCreateOrConnectWithoutUserInput | LearningPlanCreateOrConnectWithoutUserInput[]
    upsert?: LearningPlanUpsertWithWhereUniqueWithoutUserInput | LearningPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LearningPlanCreateManyUserInputEnvelope
    set?: LearningPlanWhereUniqueInput | LearningPlanWhereUniqueInput[]
    disconnect?: LearningPlanWhereUniqueInput | LearningPlanWhereUniqueInput[]
    delete?: LearningPlanWhereUniqueInput | LearningPlanWhereUniqueInput[]
    connect?: LearningPlanWhereUniqueInput | LearningPlanWhereUniqueInput[]
    update?: LearningPlanUpdateWithWhereUniqueWithoutUserInput | LearningPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LearningPlanUpdateManyWithWhereWithoutUserInput | LearningPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LearningPlanScalarWhereInput | LearningPlanScalarWhereInput[]
  }

  export type GrowthRecordUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GrowthRecordCreateWithoutUserInput, GrowthRecordUncheckedCreateWithoutUserInput> | GrowthRecordCreateWithoutUserInput[] | GrowthRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GrowthRecordCreateOrConnectWithoutUserInput | GrowthRecordCreateOrConnectWithoutUserInput[]
    upsert?: GrowthRecordUpsertWithWhereUniqueWithoutUserInput | GrowthRecordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GrowthRecordCreateManyUserInputEnvelope
    set?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    disconnect?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    delete?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    connect?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    update?: GrowthRecordUpdateWithWhereUniqueWithoutUserInput | GrowthRecordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GrowthRecordUpdateManyWithWhereWithoutUserInput | GrowthRecordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GrowthRecordScalarWhereInput | GrowthRecordScalarWhereInput[]
  }

  export type AiChatSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AiChatSessionCreateWithoutUserInput, AiChatSessionUncheckedCreateWithoutUserInput> | AiChatSessionCreateWithoutUserInput[] | AiChatSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiChatSessionCreateOrConnectWithoutUserInput | AiChatSessionCreateOrConnectWithoutUserInput[]
    upsert?: AiChatSessionUpsertWithWhereUniqueWithoutUserInput | AiChatSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AiChatSessionCreateManyUserInputEnvelope
    set?: AiChatSessionWhereUniqueInput | AiChatSessionWhereUniqueInput[]
    disconnect?: AiChatSessionWhereUniqueInput | AiChatSessionWhereUniqueInput[]
    delete?: AiChatSessionWhereUniqueInput | AiChatSessionWhereUniqueInput[]
    connect?: AiChatSessionWhereUniqueInput | AiChatSessionWhereUniqueInput[]
    update?: AiChatSessionUpdateWithWhereUniqueWithoutUserInput | AiChatSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AiChatSessionUpdateManyWithWhereWithoutUserInput | AiChatSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AiChatSessionScalarWhereInput | AiChatSessionScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCareerAssessmentInput = {
    create?: XOR<UserCreateWithoutCareerAssessmentInput, UserUncheckedCreateWithoutCareerAssessmentInput>
    connectOrCreate?: UserCreateOrConnectWithoutCareerAssessmentInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutCareerAssessmentNestedInput = {
    create?: XOR<UserCreateWithoutCareerAssessmentInput, UserUncheckedCreateWithoutCareerAssessmentInput>
    connectOrCreate?: UserCreateOrConnectWithoutCareerAssessmentInput
    upsert?: UserUpsertWithoutCareerAssessmentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCareerAssessmentInput, UserUpdateWithoutCareerAssessmentInput>, UserUncheckedUpdateWithoutCareerAssessmentInput>
  }

  export type UserCreateNestedOneWithoutResumeInput = {
    create?: XOR<UserCreateWithoutResumeInput, UserUncheckedCreateWithoutResumeInput>
    connectOrCreate?: UserCreateOrConnectWithoutResumeInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutResumeNestedInput = {
    create?: XOR<UserCreateWithoutResumeInput, UserUncheckedCreateWithoutResumeInput>
    connectOrCreate?: UserCreateOrConnectWithoutResumeInput
    upsert?: UserUpsertWithoutResumeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResumeInput, UserUpdateWithoutResumeInput>, UserUncheckedUpdateWithoutResumeInput>
  }

  export type UserCreateNestedOneWithoutInterviewSessionInput = {
    create?: XOR<UserCreateWithoutInterviewSessionInput, UserUncheckedCreateWithoutInterviewSessionInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterviewSessionInput
    connect?: UserWhereUniqueInput
  }

  export type InterviewQuestionCreateNestedManyWithoutSessionInput = {
    create?: XOR<InterviewQuestionCreateWithoutSessionInput, InterviewQuestionUncheckedCreateWithoutSessionInput> | InterviewQuestionCreateWithoutSessionInput[] | InterviewQuestionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutSessionInput | InterviewQuestionCreateOrConnectWithoutSessionInput[]
    createMany?: InterviewQuestionCreateManySessionInputEnvelope
    connect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
  }

  export type InterviewQuestionUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<InterviewQuestionCreateWithoutSessionInput, InterviewQuestionUncheckedCreateWithoutSessionInput> | InterviewQuestionCreateWithoutSessionInput[] | InterviewQuestionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutSessionInput | InterviewQuestionCreateOrConnectWithoutSessionInput[]
    createMany?: InterviewQuestionCreateManySessionInputEnvelope
    connect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutInterviewSessionNestedInput = {
    create?: XOR<UserCreateWithoutInterviewSessionInput, UserUncheckedCreateWithoutInterviewSessionInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterviewSessionInput
    upsert?: UserUpsertWithoutInterviewSessionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInterviewSessionInput, UserUpdateWithoutInterviewSessionInput>, UserUncheckedUpdateWithoutInterviewSessionInput>
  }

  export type InterviewQuestionUpdateManyWithoutSessionNestedInput = {
    create?: XOR<InterviewQuestionCreateWithoutSessionInput, InterviewQuestionUncheckedCreateWithoutSessionInput> | InterviewQuestionCreateWithoutSessionInput[] | InterviewQuestionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutSessionInput | InterviewQuestionCreateOrConnectWithoutSessionInput[]
    upsert?: InterviewQuestionUpsertWithWhereUniqueWithoutSessionInput | InterviewQuestionUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: InterviewQuestionCreateManySessionInputEnvelope
    set?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    disconnect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    delete?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    connect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    update?: InterviewQuestionUpdateWithWhereUniqueWithoutSessionInput | InterviewQuestionUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: InterviewQuestionUpdateManyWithWhereWithoutSessionInput | InterviewQuestionUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: InterviewQuestionScalarWhereInput | InterviewQuestionScalarWhereInput[]
  }

  export type InterviewQuestionUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<InterviewQuestionCreateWithoutSessionInput, InterviewQuestionUncheckedCreateWithoutSessionInput> | InterviewQuestionCreateWithoutSessionInput[] | InterviewQuestionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutSessionInput | InterviewQuestionCreateOrConnectWithoutSessionInput[]
    upsert?: InterviewQuestionUpsertWithWhereUniqueWithoutSessionInput | InterviewQuestionUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: InterviewQuestionCreateManySessionInputEnvelope
    set?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    disconnect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    delete?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    connect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    update?: InterviewQuestionUpdateWithWhereUniqueWithoutSessionInput | InterviewQuestionUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: InterviewQuestionUpdateManyWithWhereWithoutSessionInput | InterviewQuestionUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: InterviewQuestionScalarWhereInput | InterviewQuestionScalarWhereInput[]
  }

  export type InterviewSessionCreateNestedOneWithoutInterviewQuestionInput = {
    create?: XOR<InterviewSessionCreateWithoutInterviewQuestionInput, InterviewSessionUncheckedCreateWithoutInterviewQuestionInput>
    connectOrCreate?: InterviewSessionCreateOrConnectWithoutInterviewQuestionInput
    connect?: InterviewSessionWhereUniqueInput
  }

  export type InterviewSessionUpdateOneRequiredWithoutInterviewQuestionNestedInput = {
    create?: XOR<InterviewSessionCreateWithoutInterviewQuestionInput, InterviewSessionUncheckedCreateWithoutInterviewQuestionInput>
    connectOrCreate?: InterviewSessionCreateOrConnectWithoutInterviewQuestionInput
    upsert?: InterviewSessionUpsertWithoutInterviewQuestionInput
    connect?: InterviewSessionWhereUniqueInput
    update?: XOR<XOR<InterviewSessionUpdateToOneWithWhereWithoutInterviewQuestionInput, InterviewSessionUpdateWithoutInterviewQuestionInput>, InterviewSessionUncheckedUpdateWithoutInterviewQuestionInput>
  }

  export type UserCreateNestedOneWithoutLearningPlanInput = {
    create?: XOR<UserCreateWithoutLearningPlanInput, UserUncheckedCreateWithoutLearningPlanInput>
    connectOrCreate?: UserCreateOrConnectWithoutLearningPlanInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLearningPlanNestedInput = {
    create?: XOR<UserCreateWithoutLearningPlanInput, UserUncheckedCreateWithoutLearningPlanInput>
    connectOrCreate?: UserCreateOrConnectWithoutLearningPlanInput
    upsert?: UserUpsertWithoutLearningPlanInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLearningPlanInput, UserUpdateWithoutLearningPlanInput>, UserUncheckedUpdateWithoutLearningPlanInput>
  }

  export type UserCreateNestedOneWithoutGrowthRecordInput = {
    create?: XOR<UserCreateWithoutGrowthRecordInput, UserUncheckedCreateWithoutGrowthRecordInput>
    connectOrCreate?: UserCreateOrConnectWithoutGrowthRecordInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutGrowthRecordNestedInput = {
    create?: XOR<UserCreateWithoutGrowthRecordInput, UserUncheckedCreateWithoutGrowthRecordInput>
    connectOrCreate?: UserCreateOrConnectWithoutGrowthRecordInput
    upsert?: UserUpsertWithoutGrowthRecordInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGrowthRecordInput, UserUpdateWithoutGrowthRecordInput>, UserUncheckedUpdateWithoutGrowthRecordInput>
  }

  export type UserCreateNestedOneWithoutAiChatSessionInput = {
    create?: XOR<UserCreateWithoutAiChatSessionInput, UserUncheckedCreateWithoutAiChatSessionInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiChatSessionInput
    connect?: UserWhereUniqueInput
  }

  export type AiChatMessageCreateNestedManyWithoutSessionInput = {
    create?: XOR<AiChatMessageCreateWithoutSessionInput, AiChatMessageUncheckedCreateWithoutSessionInput> | AiChatMessageCreateWithoutSessionInput[] | AiChatMessageUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiChatMessageCreateOrConnectWithoutSessionInput | AiChatMessageCreateOrConnectWithoutSessionInput[]
    createMany?: AiChatMessageCreateManySessionInputEnvelope
    connect?: AiChatMessageWhereUniqueInput | AiChatMessageWhereUniqueInput[]
  }

  export type AiChatMessageUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<AiChatMessageCreateWithoutSessionInput, AiChatMessageUncheckedCreateWithoutSessionInput> | AiChatMessageCreateWithoutSessionInput[] | AiChatMessageUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiChatMessageCreateOrConnectWithoutSessionInput | AiChatMessageCreateOrConnectWithoutSessionInput[]
    createMany?: AiChatMessageCreateManySessionInputEnvelope
    connect?: AiChatMessageWhereUniqueInput | AiChatMessageWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutAiChatSessionNestedInput = {
    create?: XOR<UserCreateWithoutAiChatSessionInput, UserUncheckedCreateWithoutAiChatSessionInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiChatSessionInput
    upsert?: UserUpsertWithoutAiChatSessionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAiChatSessionInput, UserUpdateWithoutAiChatSessionInput>, UserUncheckedUpdateWithoutAiChatSessionInput>
  }

  export type AiChatMessageUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AiChatMessageCreateWithoutSessionInput, AiChatMessageUncheckedCreateWithoutSessionInput> | AiChatMessageCreateWithoutSessionInput[] | AiChatMessageUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiChatMessageCreateOrConnectWithoutSessionInput | AiChatMessageCreateOrConnectWithoutSessionInput[]
    upsert?: AiChatMessageUpsertWithWhereUniqueWithoutSessionInput | AiChatMessageUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AiChatMessageCreateManySessionInputEnvelope
    set?: AiChatMessageWhereUniqueInput | AiChatMessageWhereUniqueInput[]
    disconnect?: AiChatMessageWhereUniqueInput | AiChatMessageWhereUniqueInput[]
    delete?: AiChatMessageWhereUniqueInput | AiChatMessageWhereUniqueInput[]
    connect?: AiChatMessageWhereUniqueInput | AiChatMessageWhereUniqueInput[]
    update?: AiChatMessageUpdateWithWhereUniqueWithoutSessionInput | AiChatMessageUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AiChatMessageUpdateManyWithWhereWithoutSessionInput | AiChatMessageUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AiChatMessageScalarWhereInput | AiChatMessageScalarWhereInput[]
  }

  export type AiChatMessageUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AiChatMessageCreateWithoutSessionInput, AiChatMessageUncheckedCreateWithoutSessionInput> | AiChatMessageCreateWithoutSessionInput[] | AiChatMessageUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiChatMessageCreateOrConnectWithoutSessionInput | AiChatMessageCreateOrConnectWithoutSessionInput[]
    upsert?: AiChatMessageUpsertWithWhereUniqueWithoutSessionInput | AiChatMessageUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AiChatMessageCreateManySessionInputEnvelope
    set?: AiChatMessageWhereUniqueInput | AiChatMessageWhereUniqueInput[]
    disconnect?: AiChatMessageWhereUniqueInput | AiChatMessageWhereUniqueInput[]
    delete?: AiChatMessageWhereUniqueInput | AiChatMessageWhereUniqueInput[]
    connect?: AiChatMessageWhereUniqueInput | AiChatMessageWhereUniqueInput[]
    update?: AiChatMessageUpdateWithWhereUniqueWithoutSessionInput | AiChatMessageUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AiChatMessageUpdateManyWithWhereWithoutSessionInput | AiChatMessageUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AiChatMessageScalarWhereInput | AiChatMessageScalarWhereInput[]
  }

  export type AiChatSessionCreateNestedOneWithoutAiChatMessageInput = {
    create?: XOR<AiChatSessionCreateWithoutAiChatMessageInput, AiChatSessionUncheckedCreateWithoutAiChatMessageInput>
    connectOrCreate?: AiChatSessionCreateOrConnectWithoutAiChatMessageInput
    connect?: AiChatSessionWhereUniqueInput
  }

  export type AiChatSessionUpdateOneRequiredWithoutAiChatMessageNestedInput = {
    create?: XOR<AiChatSessionCreateWithoutAiChatMessageInput, AiChatSessionUncheckedCreateWithoutAiChatMessageInput>
    connectOrCreate?: AiChatSessionCreateOrConnectWithoutAiChatMessageInput
    upsert?: AiChatSessionUpsertWithoutAiChatMessageInput
    connect?: AiChatSessionWhereUniqueInput
    update?: XOR<XOR<AiChatSessionUpdateToOneWithWhereWithoutAiChatMessageInput, AiChatSessionUpdateWithoutAiChatMessageInput>, AiChatSessionUncheckedUpdateWithoutAiChatMessageInput>
  }

  export type UserCreateNestedOneWithoutNotificationInput = {
    create?: XOR<UserCreateWithoutNotificationInput, UserUncheckedCreateWithoutNotificationInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationNestedInput = {
    create?: XOR<UserCreateWithoutNotificationInput, UserUncheckedCreateWithoutNotificationInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationInput
    upsert?: UserUpsertWithoutNotificationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationInput, UserUpdateWithoutNotificationInput>, UserUncheckedUpdateWithoutNotificationInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CareerAssessmentCreateWithoutUserInput = {
    assessmentType: string
    inputData: string
    resultData: string
    score?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareerAssessmentUncheckedCreateWithoutUserInput = {
    id?: number
    assessmentType: string
    inputData: string
    resultData: string
    score?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareerAssessmentCreateOrConnectWithoutUserInput = {
    where: CareerAssessmentWhereUniqueInput
    create: XOR<CareerAssessmentCreateWithoutUserInput, CareerAssessmentUncheckedCreateWithoutUserInput>
  }

  export type CareerAssessmentCreateManyUserInputEnvelope = {
    data: CareerAssessmentCreateManyUserInput | CareerAssessmentCreateManyUserInput[]
  }

  export type ResumeCreateWithoutUserInput = {
    fileName: string
    fileUrl: string
    parsedData: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeUncheckedCreateWithoutUserInput = {
    id?: number
    fileName: string
    fileUrl: string
    parsedData: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeCreateOrConnectWithoutUserInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
  }

  export type ResumeCreateManyUserInputEnvelope = {
    data: ResumeCreateManyUserInput | ResumeCreateManyUserInput[]
  }

  export type InterviewSessionCreateWithoutUserInput = {
    jobTitle: string
    level: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    InterviewQuestion?: InterviewQuestionCreateNestedManyWithoutSessionInput
  }

  export type InterviewSessionUncheckedCreateWithoutUserInput = {
    id?: number
    jobTitle: string
    level: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    InterviewQuestion?: InterviewQuestionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type InterviewSessionCreateOrConnectWithoutUserInput = {
    where: InterviewSessionWhereUniqueInput
    create: XOR<InterviewSessionCreateWithoutUserInput, InterviewSessionUncheckedCreateWithoutUserInput>
  }

  export type InterviewSessionCreateManyUserInputEnvelope = {
    data: InterviewSessionCreateManyUserInput | InterviewSessionCreateManyUserInput[]
  }

  export type LearningPlanCreateWithoutUserInput = {
    title: string
    description?: string | null
    planData: string
    progress?: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningPlanUncheckedCreateWithoutUserInput = {
    id?: number
    title: string
    description?: string | null
    planData: string
    progress?: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningPlanCreateOrConnectWithoutUserInput = {
    where: LearningPlanWhereUniqueInput
    create: XOR<LearningPlanCreateWithoutUserInput, LearningPlanUncheckedCreateWithoutUserInput>
  }

  export type LearningPlanCreateManyUserInputEnvelope = {
    data: LearningPlanCreateManyUserInput | LearningPlanCreateManyUserInput[]
  }

  export type GrowthRecordCreateWithoutUserInput = {
    type: string
    content: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type GrowthRecordUncheckedCreateWithoutUserInput = {
    id?: number
    type: string
    content: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type GrowthRecordCreateOrConnectWithoutUserInput = {
    where: GrowthRecordWhereUniqueInput
    create: XOR<GrowthRecordCreateWithoutUserInput, GrowthRecordUncheckedCreateWithoutUserInput>
  }

  export type GrowthRecordCreateManyUserInputEnvelope = {
    data: GrowthRecordCreateManyUserInput | GrowthRecordCreateManyUserInput[]
  }

  export type AiChatSessionCreateWithoutUserInput = {
    chatType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    AiChatMessage?: AiChatMessageCreateNestedManyWithoutSessionInput
  }

  export type AiChatSessionUncheckedCreateWithoutUserInput = {
    id?: number
    chatType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    AiChatMessage?: AiChatMessageUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AiChatSessionCreateOrConnectWithoutUserInput = {
    where: AiChatSessionWhereUniqueInput
    create: XOR<AiChatSessionCreateWithoutUserInput, AiChatSessionUncheckedCreateWithoutUserInput>
  }

  export type AiChatSessionCreateManyUserInputEnvelope = {
    data: AiChatSessionCreateManyUserInput | AiChatSessionCreateManyUserInput[]
  }

  export type NotificationCreateWithoutUserInput = {
    type: string
    title: string
    content: string
    isRead?: number
    metadata?: string | null
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: number
    type: string
    title: string
    content: string
    isRead?: number
    metadata?: string | null
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
  }

  export type CareerAssessmentUpsertWithWhereUniqueWithoutUserInput = {
    where: CareerAssessmentWhereUniqueInput
    update: XOR<CareerAssessmentUpdateWithoutUserInput, CareerAssessmentUncheckedUpdateWithoutUserInput>
    create: XOR<CareerAssessmentCreateWithoutUserInput, CareerAssessmentUncheckedCreateWithoutUserInput>
  }

  export type CareerAssessmentUpdateWithWhereUniqueWithoutUserInput = {
    where: CareerAssessmentWhereUniqueInput
    data: XOR<CareerAssessmentUpdateWithoutUserInput, CareerAssessmentUncheckedUpdateWithoutUserInput>
  }

  export type CareerAssessmentUpdateManyWithWhereWithoutUserInput = {
    where: CareerAssessmentScalarWhereInput
    data: XOR<CareerAssessmentUpdateManyMutationInput, CareerAssessmentUncheckedUpdateManyWithoutUserInput>
  }

  export type CareerAssessmentScalarWhereInput = {
    AND?: CareerAssessmentScalarWhereInput | CareerAssessmentScalarWhereInput[]
    OR?: CareerAssessmentScalarWhereInput[]
    NOT?: CareerAssessmentScalarWhereInput | CareerAssessmentScalarWhereInput[]
    id?: IntFilter<"CareerAssessment"> | number
    userId?: IntFilter<"CareerAssessment"> | number
    assessmentType?: StringFilter<"CareerAssessment"> | string
    inputData?: StringFilter<"CareerAssessment"> | string
    resultData?: StringFilter<"CareerAssessment"> | string
    score?: IntNullableFilter<"CareerAssessment"> | number | null
    createdAt?: DateTimeFilter<"CareerAssessment"> | Date | string
    updatedAt?: DateTimeFilter<"CareerAssessment"> | Date | string
  }

  export type ResumeUpsertWithWhereUniqueWithoutUserInput = {
    where: ResumeWhereUniqueInput
    update: XOR<ResumeUpdateWithoutUserInput, ResumeUncheckedUpdateWithoutUserInput>
    create: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
  }

  export type ResumeUpdateWithWhereUniqueWithoutUserInput = {
    where: ResumeWhereUniqueInput
    data: XOR<ResumeUpdateWithoutUserInput, ResumeUncheckedUpdateWithoutUserInput>
  }

  export type ResumeUpdateManyWithWhereWithoutUserInput = {
    where: ResumeScalarWhereInput
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyWithoutUserInput>
  }

  export type ResumeScalarWhereInput = {
    AND?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    OR?: ResumeScalarWhereInput[]
    NOT?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    id?: IntFilter<"Resume"> | number
    userId?: IntFilter<"Resume"> | number
    fileName?: StringFilter<"Resume"> | string
    fileUrl?: StringFilter<"Resume"> | string
    parsedData?: StringFilter<"Resume"> | string
    status?: StringFilter<"Resume"> | string
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
  }

  export type InterviewSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: InterviewSessionWhereUniqueInput
    update: XOR<InterviewSessionUpdateWithoutUserInput, InterviewSessionUncheckedUpdateWithoutUserInput>
    create: XOR<InterviewSessionCreateWithoutUserInput, InterviewSessionUncheckedCreateWithoutUserInput>
  }

  export type InterviewSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: InterviewSessionWhereUniqueInput
    data: XOR<InterviewSessionUpdateWithoutUserInput, InterviewSessionUncheckedUpdateWithoutUserInput>
  }

  export type InterviewSessionUpdateManyWithWhereWithoutUserInput = {
    where: InterviewSessionScalarWhereInput
    data: XOR<InterviewSessionUpdateManyMutationInput, InterviewSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type InterviewSessionScalarWhereInput = {
    AND?: InterviewSessionScalarWhereInput | InterviewSessionScalarWhereInput[]
    OR?: InterviewSessionScalarWhereInput[]
    NOT?: InterviewSessionScalarWhereInput | InterviewSessionScalarWhereInput[]
    id?: IntFilter<"InterviewSession"> | number
    userId?: IntFilter<"InterviewSession"> | number
    jobTitle?: StringFilter<"InterviewSession"> | string
    level?: StringFilter<"InterviewSession"> | string
    status?: StringFilter<"InterviewSession"> | string
    createdAt?: DateTimeFilter<"InterviewSession"> | Date | string
    updatedAt?: DateTimeFilter<"InterviewSession"> | Date | string
  }

  export type LearningPlanUpsertWithWhereUniqueWithoutUserInput = {
    where: LearningPlanWhereUniqueInput
    update: XOR<LearningPlanUpdateWithoutUserInput, LearningPlanUncheckedUpdateWithoutUserInput>
    create: XOR<LearningPlanCreateWithoutUserInput, LearningPlanUncheckedCreateWithoutUserInput>
  }

  export type LearningPlanUpdateWithWhereUniqueWithoutUserInput = {
    where: LearningPlanWhereUniqueInput
    data: XOR<LearningPlanUpdateWithoutUserInput, LearningPlanUncheckedUpdateWithoutUserInput>
  }

  export type LearningPlanUpdateManyWithWhereWithoutUserInput = {
    where: LearningPlanScalarWhereInput
    data: XOR<LearningPlanUpdateManyMutationInput, LearningPlanUncheckedUpdateManyWithoutUserInput>
  }

  export type LearningPlanScalarWhereInput = {
    AND?: LearningPlanScalarWhereInput | LearningPlanScalarWhereInput[]
    OR?: LearningPlanScalarWhereInput[]
    NOT?: LearningPlanScalarWhereInput | LearningPlanScalarWhereInput[]
    id?: IntFilter<"LearningPlan"> | number
    userId?: IntFilter<"LearningPlan"> | number
    title?: StringFilter<"LearningPlan"> | string
    description?: StringNullableFilter<"LearningPlan"> | string | null
    planData?: StringFilter<"LearningPlan"> | string
    progress?: IntFilter<"LearningPlan"> | number
    status?: StringFilter<"LearningPlan"> | string
    createdAt?: DateTimeFilter<"LearningPlan"> | Date | string
    updatedAt?: DateTimeFilter<"LearningPlan"> | Date | string
  }

  export type GrowthRecordUpsertWithWhereUniqueWithoutUserInput = {
    where: GrowthRecordWhereUniqueInput
    update: XOR<GrowthRecordUpdateWithoutUserInput, GrowthRecordUncheckedUpdateWithoutUserInput>
    create: XOR<GrowthRecordCreateWithoutUserInput, GrowthRecordUncheckedCreateWithoutUserInput>
  }

  export type GrowthRecordUpdateWithWhereUniqueWithoutUserInput = {
    where: GrowthRecordWhereUniqueInput
    data: XOR<GrowthRecordUpdateWithoutUserInput, GrowthRecordUncheckedUpdateWithoutUserInput>
  }

  export type GrowthRecordUpdateManyWithWhereWithoutUserInput = {
    where: GrowthRecordScalarWhereInput
    data: XOR<GrowthRecordUpdateManyMutationInput, GrowthRecordUncheckedUpdateManyWithoutUserInput>
  }

  export type GrowthRecordScalarWhereInput = {
    AND?: GrowthRecordScalarWhereInput | GrowthRecordScalarWhereInput[]
    OR?: GrowthRecordScalarWhereInput[]
    NOT?: GrowthRecordScalarWhereInput | GrowthRecordScalarWhereInput[]
    id?: IntFilter<"GrowthRecord"> | number
    userId?: IntFilter<"GrowthRecord"> | number
    type?: StringFilter<"GrowthRecord"> | string
    content?: StringFilter<"GrowthRecord"> | string
    metadata?: StringNullableFilter<"GrowthRecord"> | string | null
    createdAt?: DateTimeFilter<"GrowthRecord"> | Date | string
  }

  export type AiChatSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: AiChatSessionWhereUniqueInput
    update: XOR<AiChatSessionUpdateWithoutUserInput, AiChatSessionUncheckedUpdateWithoutUserInput>
    create: XOR<AiChatSessionCreateWithoutUserInput, AiChatSessionUncheckedCreateWithoutUserInput>
  }

  export type AiChatSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: AiChatSessionWhereUniqueInput
    data: XOR<AiChatSessionUpdateWithoutUserInput, AiChatSessionUncheckedUpdateWithoutUserInput>
  }

  export type AiChatSessionUpdateManyWithWhereWithoutUserInput = {
    where: AiChatSessionScalarWhereInput
    data: XOR<AiChatSessionUpdateManyMutationInput, AiChatSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type AiChatSessionScalarWhereInput = {
    AND?: AiChatSessionScalarWhereInput | AiChatSessionScalarWhereInput[]
    OR?: AiChatSessionScalarWhereInput[]
    NOT?: AiChatSessionScalarWhereInput | AiChatSessionScalarWhereInput[]
    id?: IntFilter<"AiChatSession"> | number
    userId?: IntFilter<"AiChatSession"> | number
    chatType?: StringFilter<"AiChatSession"> | string
    status?: StringFilter<"AiChatSession"> | string
    createdAt?: DateTimeFilter<"AiChatSession"> | Date | string
    updatedAt?: DateTimeFilter<"AiChatSession"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: IntFilter<"Notification"> | number
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    content?: StringFilter<"Notification"> | string
    isRead?: IntFilter<"Notification"> | number
    metadata?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type UserCreateWithoutCareerAssessmentInput = {
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Resume?: ResumeCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionCreateNestedManyWithoutUserInput
    Notification?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCareerAssessmentInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Resume?: ResumeUncheckedCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanUncheckedCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordUncheckedCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionUncheckedCreateNestedManyWithoutUserInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCareerAssessmentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCareerAssessmentInput, UserUncheckedCreateWithoutCareerAssessmentInput>
  }

  export type UserUpsertWithoutCareerAssessmentInput = {
    update: XOR<UserUpdateWithoutCareerAssessmentInput, UserUncheckedUpdateWithoutCareerAssessmentInput>
    create: XOR<UserCreateWithoutCareerAssessmentInput, UserUncheckedCreateWithoutCareerAssessmentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCareerAssessmentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCareerAssessmentInput, UserUncheckedUpdateWithoutCareerAssessmentInput>
  }

  export type UserUpdateWithoutCareerAssessmentInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Resume?: ResumeUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUpdateManyWithoutUserNestedInput
    Notification?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCareerAssessmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Resume?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUncheckedUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUncheckedUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUncheckedUpdateManyWithoutUserNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutResumeInput = {
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionCreateNestedManyWithoutUserInput
    Notification?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResumeInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentUncheckedCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanUncheckedCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordUncheckedCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionUncheckedCreateNestedManyWithoutUserInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResumeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResumeInput, UserUncheckedCreateWithoutResumeInput>
  }

  export type UserUpsertWithoutResumeInput = {
    update: XOR<UserUpdateWithoutResumeInput, UserUncheckedUpdateWithoutResumeInput>
    create: XOR<UserCreateWithoutResumeInput, UserUncheckedCreateWithoutResumeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResumeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResumeInput, UserUncheckedUpdateWithoutResumeInput>
  }

  export type UserUpdateWithoutResumeInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUpdateManyWithoutUserNestedInput
    Notification?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResumeInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUncheckedUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUncheckedUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUncheckedUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUncheckedUpdateManyWithoutUserNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutInterviewSessionInput = {
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentCreateNestedManyWithoutUserInput
    Resume?: ResumeCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionCreateNestedManyWithoutUserInput
    Notification?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInterviewSessionInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentUncheckedCreateNestedManyWithoutUserInput
    Resume?: ResumeUncheckedCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanUncheckedCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordUncheckedCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionUncheckedCreateNestedManyWithoutUserInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInterviewSessionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInterviewSessionInput, UserUncheckedCreateWithoutInterviewSessionInput>
  }

  export type InterviewQuestionCreateWithoutSessionInput = {
    question: string
    answer?: string | null
    evaluation?: string | null
    nextQuestion?: string | null
    createdAt?: Date | string
  }

  export type InterviewQuestionUncheckedCreateWithoutSessionInput = {
    id?: number
    question: string
    answer?: string | null
    evaluation?: string | null
    nextQuestion?: string | null
    createdAt?: Date | string
  }

  export type InterviewQuestionCreateOrConnectWithoutSessionInput = {
    where: InterviewQuestionWhereUniqueInput
    create: XOR<InterviewQuestionCreateWithoutSessionInput, InterviewQuestionUncheckedCreateWithoutSessionInput>
  }

  export type InterviewQuestionCreateManySessionInputEnvelope = {
    data: InterviewQuestionCreateManySessionInput | InterviewQuestionCreateManySessionInput[]
  }

  export type UserUpsertWithoutInterviewSessionInput = {
    update: XOR<UserUpdateWithoutInterviewSessionInput, UserUncheckedUpdateWithoutInterviewSessionInput>
    create: XOR<UserCreateWithoutInterviewSessionInput, UserUncheckedCreateWithoutInterviewSessionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInterviewSessionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInterviewSessionInput, UserUncheckedUpdateWithoutInterviewSessionInput>
  }

  export type UserUpdateWithoutInterviewSessionInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUpdateManyWithoutUserNestedInput
    Resume?: ResumeUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUpdateManyWithoutUserNestedInput
    Notification?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInterviewSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUncheckedUpdateManyWithoutUserNestedInput
    Resume?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUncheckedUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUncheckedUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUncheckedUpdateManyWithoutUserNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type InterviewQuestionUpsertWithWhereUniqueWithoutSessionInput = {
    where: InterviewQuestionWhereUniqueInput
    update: XOR<InterviewQuestionUpdateWithoutSessionInput, InterviewQuestionUncheckedUpdateWithoutSessionInput>
    create: XOR<InterviewQuestionCreateWithoutSessionInput, InterviewQuestionUncheckedCreateWithoutSessionInput>
  }

  export type InterviewQuestionUpdateWithWhereUniqueWithoutSessionInput = {
    where: InterviewQuestionWhereUniqueInput
    data: XOR<InterviewQuestionUpdateWithoutSessionInput, InterviewQuestionUncheckedUpdateWithoutSessionInput>
  }

  export type InterviewQuestionUpdateManyWithWhereWithoutSessionInput = {
    where: InterviewQuestionScalarWhereInput
    data: XOR<InterviewQuestionUpdateManyMutationInput, InterviewQuestionUncheckedUpdateManyWithoutSessionInput>
  }

  export type InterviewQuestionScalarWhereInput = {
    AND?: InterviewQuestionScalarWhereInput | InterviewQuestionScalarWhereInput[]
    OR?: InterviewQuestionScalarWhereInput[]
    NOT?: InterviewQuestionScalarWhereInput | InterviewQuestionScalarWhereInput[]
    id?: IntFilter<"InterviewQuestion"> | number
    sessionId?: IntFilter<"InterviewQuestion"> | number
    question?: StringFilter<"InterviewQuestion"> | string
    answer?: StringNullableFilter<"InterviewQuestion"> | string | null
    evaluation?: StringNullableFilter<"InterviewQuestion"> | string | null
    nextQuestion?: StringNullableFilter<"InterviewQuestion"> | string | null
    createdAt?: DateTimeFilter<"InterviewQuestion"> | Date | string
  }

  export type InterviewSessionCreateWithoutInterviewQuestionInput = {
    jobTitle: string
    level: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInterviewSessionInput
  }

  export type InterviewSessionUncheckedCreateWithoutInterviewQuestionInput = {
    id?: number
    userId: number
    jobTitle: string
    level: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewSessionCreateOrConnectWithoutInterviewQuestionInput = {
    where: InterviewSessionWhereUniqueInput
    create: XOR<InterviewSessionCreateWithoutInterviewQuestionInput, InterviewSessionUncheckedCreateWithoutInterviewQuestionInput>
  }

  export type InterviewSessionUpsertWithoutInterviewQuestionInput = {
    update: XOR<InterviewSessionUpdateWithoutInterviewQuestionInput, InterviewSessionUncheckedUpdateWithoutInterviewQuestionInput>
    create: XOR<InterviewSessionCreateWithoutInterviewQuestionInput, InterviewSessionUncheckedCreateWithoutInterviewQuestionInput>
    where?: InterviewSessionWhereInput
  }

  export type InterviewSessionUpdateToOneWithWhereWithoutInterviewQuestionInput = {
    where?: InterviewSessionWhereInput
    data: XOR<InterviewSessionUpdateWithoutInterviewQuestionInput, InterviewSessionUncheckedUpdateWithoutInterviewQuestionInput>
  }

  export type InterviewSessionUpdateWithoutInterviewQuestionInput = {
    jobTitle?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInterviewSessionNestedInput
  }

  export type InterviewSessionUncheckedUpdateWithoutInterviewQuestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    jobTitle?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutLearningPlanInput = {
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentCreateNestedManyWithoutUserInput
    Resume?: ResumeCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionCreateNestedManyWithoutUserInput
    Notification?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLearningPlanInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentUncheckedCreateNestedManyWithoutUserInput
    Resume?: ResumeUncheckedCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordUncheckedCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionUncheckedCreateNestedManyWithoutUserInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLearningPlanInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLearningPlanInput, UserUncheckedCreateWithoutLearningPlanInput>
  }

  export type UserUpsertWithoutLearningPlanInput = {
    update: XOR<UserUpdateWithoutLearningPlanInput, UserUncheckedUpdateWithoutLearningPlanInput>
    create: XOR<UserCreateWithoutLearningPlanInput, UserUncheckedCreateWithoutLearningPlanInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLearningPlanInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLearningPlanInput, UserUncheckedUpdateWithoutLearningPlanInput>
  }

  export type UserUpdateWithoutLearningPlanInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUpdateManyWithoutUserNestedInput
    Resume?: ResumeUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUpdateManyWithoutUserNestedInput
    Notification?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLearningPlanInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUncheckedUpdateManyWithoutUserNestedInput
    Resume?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUncheckedUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUncheckedUpdateManyWithoutUserNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutGrowthRecordInput = {
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentCreateNestedManyWithoutUserInput
    Resume?: ResumeCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionCreateNestedManyWithoutUserInput
    Notification?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGrowthRecordInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentUncheckedCreateNestedManyWithoutUserInput
    Resume?: ResumeUncheckedCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanUncheckedCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionUncheckedCreateNestedManyWithoutUserInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGrowthRecordInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGrowthRecordInput, UserUncheckedCreateWithoutGrowthRecordInput>
  }

  export type UserUpsertWithoutGrowthRecordInput = {
    update: XOR<UserUpdateWithoutGrowthRecordInput, UserUncheckedUpdateWithoutGrowthRecordInput>
    create: XOR<UserCreateWithoutGrowthRecordInput, UserUncheckedCreateWithoutGrowthRecordInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGrowthRecordInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGrowthRecordInput, UserUncheckedUpdateWithoutGrowthRecordInput>
  }

  export type UserUpdateWithoutGrowthRecordInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUpdateManyWithoutUserNestedInput
    Resume?: ResumeUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUpdateManyWithoutUserNestedInput
    Notification?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGrowthRecordInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUncheckedUpdateManyWithoutUserNestedInput
    Resume?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUncheckedUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUncheckedUpdateManyWithoutUserNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAiChatSessionInput = {
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentCreateNestedManyWithoutUserInput
    Resume?: ResumeCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordCreateNestedManyWithoutUserInput
    Notification?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAiChatSessionInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentUncheckedCreateNestedManyWithoutUserInput
    Resume?: ResumeUncheckedCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanUncheckedCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordUncheckedCreateNestedManyWithoutUserInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAiChatSessionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAiChatSessionInput, UserUncheckedCreateWithoutAiChatSessionInput>
  }

  export type AiChatMessageCreateWithoutSessionInput = {
    role: string
    content: string
    createdAt?: Date | string
  }

  export type AiChatMessageUncheckedCreateWithoutSessionInput = {
    id?: number
    role: string
    content: string
    createdAt?: Date | string
  }

  export type AiChatMessageCreateOrConnectWithoutSessionInput = {
    where: AiChatMessageWhereUniqueInput
    create: XOR<AiChatMessageCreateWithoutSessionInput, AiChatMessageUncheckedCreateWithoutSessionInput>
  }

  export type AiChatMessageCreateManySessionInputEnvelope = {
    data: AiChatMessageCreateManySessionInput | AiChatMessageCreateManySessionInput[]
  }

  export type UserUpsertWithoutAiChatSessionInput = {
    update: XOR<UserUpdateWithoutAiChatSessionInput, UserUncheckedUpdateWithoutAiChatSessionInput>
    create: XOR<UserCreateWithoutAiChatSessionInput, UserUncheckedCreateWithoutAiChatSessionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAiChatSessionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAiChatSessionInput, UserUncheckedUpdateWithoutAiChatSessionInput>
  }

  export type UserUpdateWithoutAiChatSessionInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUpdateManyWithoutUserNestedInput
    Resume?: ResumeUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUpdateManyWithoutUserNestedInput
    Notification?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAiChatSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUncheckedUpdateManyWithoutUserNestedInput
    Resume?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUncheckedUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUncheckedUpdateManyWithoutUserNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AiChatMessageUpsertWithWhereUniqueWithoutSessionInput = {
    where: AiChatMessageWhereUniqueInput
    update: XOR<AiChatMessageUpdateWithoutSessionInput, AiChatMessageUncheckedUpdateWithoutSessionInput>
    create: XOR<AiChatMessageCreateWithoutSessionInput, AiChatMessageUncheckedCreateWithoutSessionInput>
  }

  export type AiChatMessageUpdateWithWhereUniqueWithoutSessionInput = {
    where: AiChatMessageWhereUniqueInput
    data: XOR<AiChatMessageUpdateWithoutSessionInput, AiChatMessageUncheckedUpdateWithoutSessionInput>
  }

  export type AiChatMessageUpdateManyWithWhereWithoutSessionInput = {
    where: AiChatMessageScalarWhereInput
    data: XOR<AiChatMessageUpdateManyMutationInput, AiChatMessageUncheckedUpdateManyWithoutSessionInput>
  }

  export type AiChatMessageScalarWhereInput = {
    AND?: AiChatMessageScalarWhereInput | AiChatMessageScalarWhereInput[]
    OR?: AiChatMessageScalarWhereInput[]
    NOT?: AiChatMessageScalarWhereInput | AiChatMessageScalarWhereInput[]
    id?: IntFilter<"AiChatMessage"> | number
    sessionId?: IntFilter<"AiChatMessage"> | number
    role?: StringFilter<"AiChatMessage"> | string
    content?: StringFilter<"AiChatMessage"> | string
    createdAt?: DateTimeFilter<"AiChatMessage"> | Date | string
  }

  export type AiChatSessionCreateWithoutAiChatMessageInput = {
    chatType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAiChatSessionInput
  }

  export type AiChatSessionUncheckedCreateWithoutAiChatMessageInput = {
    id?: number
    userId: number
    chatType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiChatSessionCreateOrConnectWithoutAiChatMessageInput = {
    where: AiChatSessionWhereUniqueInput
    create: XOR<AiChatSessionCreateWithoutAiChatMessageInput, AiChatSessionUncheckedCreateWithoutAiChatMessageInput>
  }

  export type AiChatSessionUpsertWithoutAiChatMessageInput = {
    update: XOR<AiChatSessionUpdateWithoutAiChatMessageInput, AiChatSessionUncheckedUpdateWithoutAiChatMessageInput>
    create: XOR<AiChatSessionCreateWithoutAiChatMessageInput, AiChatSessionUncheckedCreateWithoutAiChatMessageInput>
    where?: AiChatSessionWhereInput
  }

  export type AiChatSessionUpdateToOneWithWhereWithoutAiChatMessageInput = {
    where?: AiChatSessionWhereInput
    data: XOR<AiChatSessionUpdateWithoutAiChatMessageInput, AiChatSessionUncheckedUpdateWithoutAiChatMessageInput>
  }

  export type AiChatSessionUpdateWithoutAiChatMessageInput = {
    chatType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAiChatSessionNestedInput
  }

  export type AiChatSessionUncheckedUpdateWithoutAiChatMessageInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    chatType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutNotificationInput = {
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentCreateNestedManyWithoutUserInput
    Resume?: ResumeCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    avatarUrl?: string | null
    phone?: string | null
    major?: string | null
    education?: string | null
    role?: string
    status?: string
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    CareerAssessment?: CareerAssessmentUncheckedCreateNestedManyWithoutUserInput
    Resume?: ResumeUncheckedCreateNestedManyWithoutUserInput
    InterviewSession?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    LearningPlan?: LearningPlanUncheckedCreateNestedManyWithoutUserInput
    GrowthRecord?: GrowthRecordUncheckedCreateNestedManyWithoutUserInput
    AiChatSession?: AiChatSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationInput, UserUncheckedCreateWithoutNotificationInput>
  }

  export type UserUpsertWithoutNotificationInput = {
    update: XOR<UserUpdateWithoutNotificationInput, UserUncheckedUpdateWithoutNotificationInput>
    create: XOR<UserCreateWithoutNotificationInput, UserUncheckedCreateWithoutNotificationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationInput, UserUncheckedUpdateWithoutNotificationInput>
  }

  export type UserUpdateWithoutNotificationInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUpdateManyWithoutUserNestedInput
    Resume?: ResumeUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CareerAssessment?: CareerAssessmentUncheckedUpdateManyWithoutUserNestedInput
    Resume?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    InterviewSession?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    LearningPlan?: LearningPlanUncheckedUpdateManyWithoutUserNestedInput
    GrowthRecord?: GrowthRecordUncheckedUpdateManyWithoutUserNestedInput
    AiChatSession?: AiChatSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CareerAssessmentCreateManyUserInput = {
    id?: number
    assessmentType: string
    inputData: string
    resultData: string
    score?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeCreateManyUserInput = {
    id?: number
    fileName: string
    fileUrl: string
    parsedData: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewSessionCreateManyUserInput = {
    id?: number
    jobTitle: string
    level: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningPlanCreateManyUserInput = {
    id?: number
    title: string
    description?: string | null
    planData: string
    progress?: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GrowthRecordCreateManyUserInput = {
    id?: number
    type: string
    content: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type AiChatSessionCreateManyUserInput = {
    id?: number
    chatType: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: number
    type: string
    title: string
    content: string
    isRead?: number
    metadata?: string | null
    createdAt?: Date | string
  }

  export type CareerAssessmentUpdateWithoutUserInput = {
    assessmentType?: StringFieldUpdateOperationsInput | string
    inputData?: StringFieldUpdateOperationsInput | string
    resultData?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerAssessmentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    assessmentType?: StringFieldUpdateOperationsInput | string
    inputData?: StringFieldUpdateOperationsInput | string
    resultData?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerAssessmentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    assessmentType?: StringFieldUpdateOperationsInput | string
    inputData?: StringFieldUpdateOperationsInput | string
    resultData?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUpdateWithoutUserInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    parsedData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    parsedData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    parsedData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewSessionUpdateWithoutUserInput = {
    jobTitle?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    InterviewQuestion?: InterviewQuestionUpdateManyWithoutSessionNestedInput
  }

  export type InterviewSessionUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    jobTitle?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    InterviewQuestion?: InterviewQuestionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type InterviewSessionUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    jobTitle?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPlanUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    planData?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPlanUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    planData?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPlanUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    planData?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrowthRecordUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrowthRecordUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrowthRecordUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatSessionUpdateWithoutUserInput = {
    chatType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AiChatMessage?: AiChatMessageUpdateManyWithoutSessionNestedInput
  }

  export type AiChatSessionUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    chatType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AiChatMessage?: AiChatMessageUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type AiChatSessionUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    chatType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewQuestionCreateManySessionInput = {
    id?: number
    question: string
    answer?: string | null
    evaluation?: string | null
    nextQuestion?: string | null
    createdAt?: Date | string
  }

  export type InterviewQuestionUpdateWithoutSessionInput = {
    question?: StringFieldUpdateOperationsInput | string
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation?: NullableStringFieldUpdateOperationsInput | string | null
    nextQuestion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewQuestionUncheckedUpdateWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation?: NullableStringFieldUpdateOperationsInput | string | null
    nextQuestion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewQuestionUncheckedUpdateManyWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation?: NullableStringFieldUpdateOperationsInput | string | null
    nextQuestion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatMessageCreateManySessionInput = {
    id?: number
    role: string
    content: string
    createdAt?: Date | string
  }

  export type AiChatMessageUpdateWithoutSessionInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatMessageUncheckedUpdateWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatMessageUncheckedUpdateManyWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InterviewSessionCountOutputTypeDefaultArgs instead
     */
    export type InterviewSessionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InterviewSessionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AiChatSessionCountOutputTypeDefaultArgs instead
     */
    export type AiChatSessionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AiChatSessionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CareerAssessmentDefaultArgs instead
     */
    export type CareerAssessmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CareerAssessmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ResumeDefaultArgs instead
     */
    export type ResumeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ResumeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InterviewSessionDefaultArgs instead
     */
    export type InterviewSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InterviewSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InterviewQuestionDefaultArgs instead
     */
    export type InterviewQuestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InterviewQuestionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LearningPlanDefaultArgs instead
     */
    export type LearningPlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LearningPlanDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GrowthRecordDefaultArgs instead
     */
    export type GrowthRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GrowthRecordDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AiChatSessionDefaultArgs instead
     */
    export type AiChatSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AiChatSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AiChatMessageDefaultArgs instead
     */
    export type AiChatMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AiChatMessageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PromptDefaultArgs instead
     */
    export type PromptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PromptDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}