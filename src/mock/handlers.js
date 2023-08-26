import { rest } from "msw";

const baseURL = "https://ci-drf-api-pj-87220ee25e96.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 11,
        username: "Testuser12",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 11,
        profile_image:
          "https://res.cloudinary.com/pjdevex/image/upload/v1/media/../default_profile_gj2yan.jpg",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
